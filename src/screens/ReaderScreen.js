import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator,
  Modal, FlatList, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';
import Header from '../components/Header';
import { Card, Serif } from '../components/ui';
import { colors, radius, spacing, shadow } from '../lib/theme';
import { api } from '../lib/api';
import { TRANSLATIONS, translationById, BIBLE_BOOKS } from '../lib/bible';
import { getSettings, saveSettings, addBookmark } from '../lib/storage';

export default function ReaderScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [book, setBook] = useState(route.params?.book || 'John');
  const [chapter, setChapter] = useState(route.params?.chapter || 1);
  const [translation, setTranslation] = useState(route.params?.translation || 'kjv');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [explain, setExplain] = useState(null);
  const [showExplain, setShowExplain] = useState(false);
  const [bookInfo, setBookInfo] = useState(null);
  const [showBookInfo, setShowBookInfo] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [pickWhat, setPickWhat] = useState(null); // 'book' | 'translation' | null
  const scrollRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    Speech.stop(); setSpeaking(false);
    try {
      const [ch, ex] = await Promise.all([
        api.chapter(translation, book, chapter),
        api.explain(book, chapter).catch(() => null),
      ]);
      setData(ch); setExplain(ex);
      if (chapter === 1) {
        api.bookOverview(book).then(setBookInfo).catch(() => {});
      } else setBookInfo(null);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    } catch {
      setData(null);
    } finally { setLoading(false); }
  }, [book, chapter, translation]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { getSettings().then((s) => s.translation && setTranslation(s.translation)); }, []);
  useEffect(() => () => Speech.stop(), []);

  const changeTranslation = (id) => {
    setTranslation(id); setPickWhat(null);
    getSettings().then((s) => saveSettings({ ...s, translation: id }));
  };

  const toggleSpeech = () => {
    if (speaking) { Speech.stop(); setSpeaking(false); return; }
    if (!data?.verses?.length) return;
    const text = data.verses.map((v) => v.text).join(' ');
    setSpeaking(true);
    Speech.speak(text, { onDone: () => setSpeaking(false), onStopped: () => setSpeaking(false), onError: () => setSpeaking(false) });
  };

  const onVersePress = (v) => {
    Alert.alert(
      `${book} ${chapter}:${v.verse}`,
      v.text.slice(0, 120) + (v.text.length > 120 ? '…' : ''),
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '🔖 Save', onPress: async () => { await addBookmark({ id: `${translation}:${book}${chapter}:${v.verse}`, reference: `${book} ${chapter}:${v.verse}`, text: v.text, translation: translation.toUpperCase() }); Alert.alert('Saved', 'Verse added to your saved verses.'); } },
        { text: '📋 Copy', onPress: () => Clipboard.setStringAsync(`"${v.text}" — ${book} ${chapter}:${v.verse} (${translation.toUpperCase()})`) },
      ]
    );
  };

  const t = translationById(translation);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header
        title={`${book}`}
        onBack={() => navigation.goBack()}
        right={<TouchableOpacity onPress={() => setPickWhat('book')} hitSlop={12}><Text style={{ fontSize: 13, color: colors.accent, fontWeight: '700' }}>Chapters</Text></TouchableOpacity>}
      />

      {/* Translation picker */}
      <TouchableOpacity style={styles.transRow} onPress={() => setPickWhat('translation')}>
        <Text style={styles.transName}>{t.short} · {t.name}</Text>
        <Text style={styles.chev}>⌄</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 60 }} size="large" color={colors.accent} />
      ) : data ? (
        <ScrollView ref={scrollRef} contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 40 }]}>
          <View style={styles.chapterHead}>
            <Serif size={28}>Chapter {chapter}</Serif>
            <View style={styles.underline} />
          </View>

          {/* Audio player */}
          <Card tinted>
            <View style={styles.audioRow}>
              <Text style={{ fontSize: 24 }}>🎧</Text>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.audioTitle}>Listen to Chapter {chapter}</Text>
                <Text style={styles.audioSub}>{book} · {t.short} text-to-speech</Text>
              </View>
              <TouchableOpacity style={styles.playBtn} onPress={toggleSpeech}>
                <Text style={styles.playIcon}>{speaking ? '■' : '▶'}</Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Book overview on chapter 1 */}
          {chapter === 1 && bookInfo && (
            <TouchableOpacity style={styles.expand} onPress={() => setShowBookInfo(!showBookInfo)}>
              <Text style={styles.expandTitle}>📖 About {book}</Text>
              <Text style={styles.chev}>{showBookInfo ? '⌃' : '⌄'}</Text>
            </TouchableOpacity>
          )}
          {chapter === 1 && bookInfo && showBookInfo && (
            <Card>
              <Text style={styles.paragraph}>{bookInfo.overview}</Text>
              <Text style={styles.themeRow}>Themes: {bookInfo.themes.join(' · ')}</Text>
              <Text style={styles.keyVerse}>Key verse: {bookInfo.keyVerse}</Text>
            </Card>
          )}

          {/* Chapter explanation */}
          {explain && explain.summary && (
            <TouchableOpacity style={styles.expand} onPress={() => setShowExplain(!showExplain)}>
              <Text style={styles.expandTitle}>💡 About this chapter</Text>
              <Text style={styles.chev}>{showExplain ? '⌃' : '⌄'}</Text>
            </TouchableOpacity>
          )}
          {showExplain && explain && (
            <Card>
              <Text style={styles.paragraph}>{explain.summary}</Text>
              <Text style={styles.paragraph}>{explain.context}</Text>
              {explain.themes?.length > 0 && <Text style={styles.themeRow}>Themes: {explain.themes.join(' · ')}</Text>}
            </Card>
          )}

          {/* Verses */}
          <View style={styles.verses}>
            {data.verses.map((v) => (
              <TouchableOpacity key={v.verse} onPress={() => onVersePress(v)} style={styles.verseRow}>
                <View style={styles.verseNum}><Text style={styles.verseNumText}>{v.verse}</Text></View>
                <Text style={styles.verseText}>{v.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {t.attribution && <Text style={styles.attribution}>{t.attribution}</Text>}

          {/* Chapter nav */}
          <View style={styles.chapNav}>
            <TouchableOpacity disabled={chapter <= 1} onPress={() => setChapter(chapter - 1)} style={[styles.navBtn, chapter <= 1 && styles.navDisabled]}>
              <Text style={styles.navText}>‹ Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setChapter(chapter + 1)} style={styles.navBtn}>
              <Text style={styles.navText}>Next ›</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.error}>Couldn't load this chapter. Check your connection and try again.</Text>
      )}

      {/* Picker modal */}
      <Modal visible={!!pickWhat} transparent animationType="slide" onRequestClose={() => setPickWhat(null)}>
        <View style={styles.modalWrap}>
          <View style={[styles.modal, { paddingBottom: insets.bottom + 16 }]}>
            <Text style={styles.modalTitle}>{pickWhat === 'book' ? 'Choose a book' : 'Choose a translation'}</Text>
            <FlatList
              data={pickWhat === 'book' ? BIBLE_BOOKS : TRANSLATIONS}
              keyExtractor={(i) => pickWhat === 'book' ? i : i.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    if (pickWhat === 'book') { setBook(item); setChapter(1); }
                    else changeTranslation(item.id);
                    setPickWhat(null);
                  }}
                >
                  <Text style={styles.modalItemText}>
                    {pickWhat === 'book' ? item : `${item.short} — ${item.name}${item.lang ? ` (${item.lang})` : ''}`}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalClose} onPress={() => setPickWhat(null)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  transRow: {
    backgroundColor: colors.tintPink, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: spacing.md,
  },
  transName: { fontWeight: '700', color: colors.text, fontSize: 14 },
  chev: { fontSize: 18, color: colors.textLight },
  body: { padding: spacing.md },
  chapterHead: { marginBottom: 8 },
  underline: { height: 3, width: 48, backgroundColor: colors.accent, borderRadius: 2, marginTop: 6 },
  audioRow: { flexDirection: 'row', alignItems: 'center' },
  audioTitle: { fontWeight: '700', color: colors.text, fontSize: 15 },
  audioSub: { color: colors.textLight, fontSize: 12, marginTop: 2 },
  playBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  playIcon: { color: colors.white, fontSize: 18, marginLeft: 2 },
  expand: {
    backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginVertical: 6, ...shadow.card,
  },
  expandTitle: { fontWeight: '700', color: colors.text, fontSize: 15 },
  verses: { marginTop: 8 },
  verseRow: { flexDirection: 'row', marginBottom: 14 },
  verseNum: {
    width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 2,
  },
  verseNumText: { color: colors.accent, fontSize: 12, fontWeight: '700' },
  verseText: { flex: 1, fontFamily: 'Georgia', fontSize: 17, lineHeight: 28, color: colors.text },
  paragraph: { fontSize: 15, lineHeight: 24, color: colors.text, marginBottom: 10 },
  themeRow: { fontSize: 13, color: colors.accent, fontWeight: '600', marginTop: 4 },
  keyVerse: { fontSize: 13, color: colors.textLight, marginTop: 6 },
  attribution: { fontSize: 11, color: colors.textLight, marginTop: 16, fontStyle: 'italic' },
  chapNav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  navBtn: { backgroundColor: colors.white, borderRadius: radius.pill, paddingVertical: 10, paddingHorizontal: 24, ...shadow.card },
  navDisabled: { opacity: 0.4 },
  navText: { color: colors.accent, fontWeight: '700', fontSize: 15 },
  error: { textAlign: 'center', marginTop: 60, color: colors.textLight, paddingHorizontal: 32 },
  modalWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: { backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '75%', paddingTop: 12 },
  modalTitle: { fontSize: 17, fontWeight: '800', textAlign: 'center', marginBottom: 8, color: colors.text },
  modalItem: { paddingVertical: 13, paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalItemText: { fontSize: 16, color: colors.text },
  modalClose: { marginTop: 12, alignSelf: 'center', backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: 10, paddingHorizontal: 40 },
  modalCloseText: { color: colors.white, fontWeight: '700' },
});

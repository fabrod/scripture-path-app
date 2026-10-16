import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import { Card, Serif } from '../components/ui';
import { colors, spacing } from '../lib/theme';
import { getBookmarks, removeBookmark, getNotes, removeNote } from '../lib/storage';

export default function BookmarksScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('verses');
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);

  const load = useCallback(() => {
    getBookmarks().then(setBookmarks);
    getNotes().then(setNotes);
  }, []);
  useFocusEffect(load);

  const openRef = (ref) => {
    const m = ref.match(/^((?:[123]\s)?[A-Za-z ]+?)\s+(\d+)/);
    if (m) navigation.navigate('Reader', { book: m[1].trim(), chapter: Number(m[2]) });
  };

  const confirmRemove = (id, isNote) => {
    Alert.alert('Remove?', 'This will be deleted from this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => {
        if (isNote) { await removeNote(id); setNotes(await getNotes()); }
        else { await removeBookmark(id); setBookmarks(await getBookmarks()); }
      } },
    ]);
  };

  const items = tab === 'verses' ? bookmarks : notes;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Saved" onBack={() => navigation.goBack()} />
      <View style={styles.tabs}>
        {['verses', 'notes'].map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'verses' ? '🔖 Verses' : '📝 Notes'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
        {items.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyCircle}><Text style={{ fontSize: 40 }}>{tab === 'verses' ? '🔖' : '📝'}</Text></View>
            <Serif size={20} style={{ marginTop: 12 }}>
              {tab === 'verses' ? 'No saved verses yet' : 'No notes yet'}
            </Serif>
            <Text style={styles.emptySub}>
              {tab === 'verses' ? 'Tap any verse while reading to save it here.' : 'Your study notes live here, on this device.'}
            </Text>
          </View>
        ) : items.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => openRef(item.reference)} onLongPress={() => confirmRemove(item.id, tab === 'notes')}>
            <Card>
              <Text style={styles.text}>"{item.text}"</Text>
              <Text style={styles.ref}>{item.reference}{item.translation ? ` · ${item.translation}` : ''}</Text>
              <Text style={styles.hint}>Tap to open · long-press to remove</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: 'row', padding: spacing.md, paddingBottom: 0 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: colors.border },
  tabActive: { borderBottomColor: colors.accent },
  tabText: { fontWeight: '600', color: colors.textLight, fontSize: 14 },
  tabTextActive: { color: colors.accent },
  body: { padding: spacing.md },
  text: { fontFamily: 'Georgia', fontSize: 16, lineHeight: 24, color: colors.text },
  ref: { color: colors.accent, fontWeight: '700', marginTop: 8, fontSize: 13 },
  hint: { color: colors.textLight, fontSize: 11, marginTop: 6 },
  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.tintPink, alignItems: 'center', justifyContent: 'center' },
  emptySub: { color: colors.textLight, marginTop: 6, textAlign: 'center', paddingHorizontal: 32 },
});

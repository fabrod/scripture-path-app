import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Card, Serif } from '../components/ui';
import { colors, radius, spacing, shadow } from '../lib/theme';
import { api } from '../lib/api';

const TOPICS = ['Love', 'Faith', 'Hope', 'Forgiveness', 'Peace', 'Strength', 'Prayer', 'Salvation', 'Wisdom', 'Joy'];

export default function SearchScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState('');

  const search = async (term) => {
    const query = (term ?? q).trim();
    if (!query) return;
    setLoading(true); setSearched(query);
    try {
      const r = await api.search(query);
      setResults(r.results || []);
    } catch { setResults([]); }
    finally { setLoading(false); }
  };

  const openRef = (ref) => {
    // "John 3:16" → Reader at John 3 (verse 16 not deep-linked in v1, opens chapter)
    const m = ref.match(/^((?:[123]\s)?[A-Za-z ]+?)\s+(\d+)/);
    if (m) navigation.navigate('Reader', { book: m[1].trim(), chapter: Number(m[2]) });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Search Scripture" onBack={() => navigation.goBack()} />
      <View style={[styles.body, { paddingBottom: insets.bottom }]}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Search by verse, phrase, or keyword"
            placeholderTextColor={colors.textLight}
            value={q}
            onChangeText={setQ}
            onSubmitEditing={() => search()}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.searchBtn} onPress={() => search()}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 40 }} size="large" color={colors.accent} />
        ) : results === null ? (
          <ScrollView>
            <View style={styles.empty}>
              <View style={styles.emptyCircle}><Text style={{ fontSize: 40 }}>📖</Text></View>
              <Serif size={22} style={{ marginTop: 12 }}>Search your Bible</Serif>
              <Text style={styles.emptySub}>Search by verse, phrase, or keyword.</Text>
            </View>
            <Text style={styles.topicsLabel}>POPULAR TOPICS</Text>
            <View style={styles.topicWrap}>
              {TOPICS.map((t) => (
                <TouchableOpacity key={t} style={styles.topic} onPress={() => search(t)}>
                  <Text style={styles.topicText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <Text style={styles.count}>
              {results.length === 0 ? `No results for "${searched}"` : `${results.length} result${results.length > 1 ? 's' : ''} for "${searched}"`}
            </Text>
            {results.map((r, i) => (
              <TouchableOpacity key={i} onPress={() => openRef(r.reference)}>
                <Card>
                  <Text style={styles.resultText}>"{r.text}"</Text>
                  <Text style={styles.resultRef}>{r.reference} →</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, padding: spacing.md },
  searchRow: { flexDirection: 'row', marginBottom: 12 },
  input: {
    flex: 1, backgroundColor: '#f3ede1', borderRadius: radius.pill,
    paddingVertical: 12, paddingHorizontal: 18, fontSize: 15, color: colors.text, marginRight: 8,
  },
  searchBtn: { backgroundColor: colors.accent, borderRadius: radius.pill, paddingHorizontal: 22, justifyContent: 'center' },
  searchBtnText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  empty: { alignItems: 'center', paddingVertical: 32 },
  emptyCircle: {
    width: 96, height: 96, borderRadius: 48, backgroundColor: colors.tintPink,
    alignItems: 'center', justifyContent: 'center',
  },
  emptySub: { color: colors.textLight, marginTop: 6 },
  topicsLabel: { fontSize: 12, fontWeight: '800', letterSpacing: 1.5, color: colors.textLight, marginBottom: 10 },
  topicWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  topic: {
    backgroundColor: colors.white, borderRadius: radius.pill, paddingVertical: 10,
    paddingHorizontal: 18, marginRight: 8, marginBottom: 8, ...shadow.card,
  },
  topicText: { fontWeight: '600', color: colors.text },
  count: { color: colors.textLight, marginBottom: 8, fontSize: 13 },
  resultText: { fontFamily: 'Georgia', fontSize: 16, lineHeight: 24, color: colors.text },
  resultRef: { color: colors.accent, fontWeight: '700', marginTop: 8, fontSize: 13 },
});

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Card, Serif } from '../components/ui';
import { colors, radius, spacing, shadow } from '../lib/theme';
import { api } from '../lib/api';

const THEMES = ['Encouragement', 'Strength', 'Faith', 'Wisdom', 'Healing', 'Peace', 'Gratitude', 'Hope'];
const THEME_ICON = { Encouragement: '💛', Strength: '💪', Faith: '✝️', Wisdom: '🦉', Healing: '💚', Peace: '🕊️', Gratitude: '🙏', Hope: '🌅' };

export default function DevotionalScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [devotional, setDevotional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.devotional()
      .then((d) => { setDevotional(d); setTheme((t) => t || d.theme); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const share = () => {
    if (!devotional) return;
    Share.share({
      message: `${devotional.title}\n"${devotional.verse}" — ${devotional.reference}\n\nvia Scripture Path`,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Daily Devotional" onBack={() => navigation.goBack()}
        right={<TouchableOpacity onPress={load} hitSlop={12}><Text style={{ fontSize: 20 }}>↻</Text></TouchableOpacity>} />

      {loading && !devotional ? (
        <ActivityIndicator style={{ marginTop: 60 }} size="large" color={colors.accent} />
      ) : devotional && (
        <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
          {/* Theme pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pills}>
            {THEMES.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setTheme(t)}
                style={[styles.pill, (theme === t) && styles.pillActive]}
              >
                <Text style={[styles.pillText, (theme === t) && styles.pillTextActive]}>
                  {THEME_ICON[t]} {t}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.date}>{devotional.date} · {THEME_ICON[devotional.theme]} {devotional.theme}</Text>
          <Serif size={30} style={styles.title}>{devotional.title}</Serif>

          <TouchableOpacity style={styles.sharePill} onPress={share}>
            <Text style={styles.shareText}>↗ Share Today's Devotional</Text>
          </TouchableOpacity>

          <Card tinted>
            <Text style={styles.cardLabel}>KEY VERSE</Text>
            <Serif size={18} style={{ fontStyle: 'italic' }}>"{devotional.verse}"</Serif>
            <Text style={styles.ref}>{devotional.reference}</Text>
          </Card>

          <Text style={styles.sectionHead}>REFLECTION</Text>
          {devotional.reflection.split('\n\n').map((p, i) => (
            <Text key={i} style={styles.paragraph}>{p}</Text>
          ))}

          <Card tinted>
            <Text style={styles.cardLabel}>TODAY'S APPLICATION</Text>
            <Text style={styles.paragraph}>{devotional.application}</Text>
          </Card>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.md },
  pills: { marginBottom: 12 },
  pill: {
    backgroundColor: colors.white, borderRadius: radius.pill, paddingVertical: 8,
    paddingHorizontal: 14, marginRight: 8, borderWidth: 1, borderColor: colors.border,
  },
  pillActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  pillText: { fontSize: 13, fontWeight: '600', color: colors.text },
  pillTextActive: { color: colors.white },
  date: { color: colors.textLight, fontSize: 13, marginBottom: 8 },
  title: { marginBottom: 12 },
  sharePill: {
    backgroundColor: colors.accent, borderRadius: radius.pill, paddingVertical: 10,
    alignItems: 'center', marginBottom: 12,
  },
  shareText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  cardLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, color: colors.accent, marginBottom: 8 },
  ref: { color: colors.textLight, fontSize: 13, marginTop: 8, textAlign: 'right' },
  sectionHead: { fontSize: 13, fontWeight: '800', letterSpacing: 1.5, color: colors.text, marginTop: 16, marginBottom: 8 },
  paragraph: { fontSize: 16, lineHeight: 26, color: colors.text, marginBottom: 12 },
});

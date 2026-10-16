import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing, shadow } from '../lib/theme';
import { Card, PillButton, Serif } from '../components/ui';
import { api } from '../lib/api';
import { getSettings } from '../lib/storage';

const FEATURES = [
  { icon: '✝', title: 'Daily Devotionals', target: 'Devotional' },
  { icon: '🔍', title: 'Smart Search', target: 'Search' },
  { icon: '🙏', title: 'Prayer Community', target: 'Prayer' },
];

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [devotional, setDevotional] = useState(null);

  useEffect(() => {
    api.devotional().then(setDevotional).catch(() => {});
  }, []);

  const startReading = async () => {
    const s = await getSettings();
    navigation.navigate('Reader', { book: 'John', chapter: 1, translation: s.translation });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.wordmark}>📖 Real Scripture Path</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} hitSlop={12}>
          <Text style={styles.gear}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>✝ Real Scripture Path</Text>
          <Serif size={34} style={styles.headline}>Grow Closer to God Every Day</Serif>
          <Text style={styles.sub}>Daily devotionals, the full Bible in 15 translations, audio reading, and a prayer community — all free.</Text>
          <View style={styles.ctaRow}>
            <PillButton title="Start Reading" onPress={startReading} />
            <PillButton title="Explore Devotionals" outline onPress={() => navigation.navigate('Devotional')} />
          </View>
        </View>

        {/* Feature row */}
        <View style={styles.featureRow}>
          {FEATURES.map((f) => (
            <TouchableOpacity key={f.title} style={styles.feature} onPress={() => navigation.navigate(f.target)}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Read today */}
        <Card>
          <Text style={styles.cardLabel}>READ TODAY</Text>
          <Serif size={20}>In the beginning God created the heaven and the earth.</Serif>
          <Text style={styles.ref}>Genesis 1:1 · KJV</Text>
          <TouchableOpacity onPress={startReading}>
            <Text style={styles.link}>Read Genesis 1 →</Text>
          </TouchableOpacity>
        </Card>

        {/* Devotional preview */}
        {devotional && (
          <Card tinted>
            <Text style={styles.cardLabel}>TODAY'S DEVOTIONAL</Text>
            <Serif size={20}>{devotional.title}</Serif>
            <Text style={styles.ref}>{devotional.reference}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Devotional')}>
              <Text style={styles.link}>Read devotional →</Text>
            </TouchableOpacity>
          </Card>
        )}

        {/* Listen */}
        <Card>
          <Text style={styles.cardLabel}>🎧 HEAR THE WORD</Text>
          <Text style={styles.cardText}>Listen to any chapter read aloud, right from the reader.</Text>
          <TouchableOpacity onPress={startReading}>
            <Text style={styles.link}>Try it now →</Text>
          </TouchableOpacity>
        </Card>

        {/* Pray */}
        <Card>
          <Text style={styles.cardLabel}>🙏 SHARE & PRAY</Text>
          <Text style={styles.cardText}>Share a prayer request and pray for others — no account needed.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Prayer')}>
            <Text style={styles.link}>Pray for others →</Text>
          </TouchableOpacity>
        </Card>

        {/* Steps */}
        <View style={styles.steps}>
          <Serif size={24} style={{ textAlign: 'center', marginBottom: 12 }}>Scripture for Every Day</Serif>
          {['Read — open the Word each morning', 'Reflect — sit with the devotional', 'Pray — bring it to God and return tomorrow'].map((s, i) => (
            <View key={s} style={styles.step}>
              <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
              <Text style={styles.stepText}>{s}</Text>
            </View>
          ))}
          <PillButton title="Start Your Journey" onPress={startReading} style={{ marginTop: 12 }} />
        </View>

        {/* More links */}
        <View style={styles.moreRow}>
          <TouchableOpacity style={styles.moreLink} onPress={() => navigation.navigate('Search')}>
            <Text style={styles.link}>🔍 Verse Explorer →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreLink} onPress={() => navigation.navigate('Church')}>
            <Text style={styles.link}>⛪ Find a Church →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreLink} onPress={() => navigation.navigate('Bookmarks')}>
            <Text style={styles.link}>🔖 Saved Verses →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreLink} onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.link}>✉️ Contact Us →</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={styles.footerVerse}>"Thy word is a lamp unto my feet, and a light unto my path."</Text>
          <Text style={styles.footerRef}>Psalm 119:105</Text>
          <Text style={styles.footerCopy}>© 2026 Real Scripture Path Inc.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  wordmark: { fontSize: 17, fontWeight: '700', color: colors.text },
  gear: { fontSize: 22 },
  body: { padding: spacing.md },
  hero: { alignItems: 'center', paddingVertical: spacing.lg },
  eyebrow: { color: colors.accent, fontWeight: '700', fontSize: 13, letterSpacing: 1, marginBottom: 8 },
  headline: { textAlign: 'center', marginBottom: 10 },
  sub: { textAlign: 'center', color: colors.textLight, fontSize: 15, lineHeight: 22, marginBottom: 16 },
  ctaRow: { flexDirection: 'row', gap: 10 },
  featureRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: spacing.md },
  feature: { alignItems: 'center', flex: 1 },
  featureIcon: { fontSize: 28, marginBottom: 6 },
  featureTitle: { fontSize: 12, fontWeight: '600', color: colors.text, textAlign: 'center' },
  cardLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, color: colors.accent, marginBottom: 8 },
  ref: { color: colors.textLight, fontSize: 13, marginTop: 6, textAlign: 'right' },
  link: { color: colors.accent, fontWeight: '700', fontSize: 15, marginTop: 10 },
  cardText: { fontSize: 15, color: colors.text, lineHeight: 22 },
  steps: { marginVertical: spacing.lg },
  step: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, marginBottom: 8, ...shadow.card },
  stepNum: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  stepNumText: { color: colors.white, fontWeight: '800' },
  stepText: { fontSize: 15, color: colors.text, flex: 1 },
  moreRow: { marginBottom: spacing.lg },
  moreLink: { paddingVertical: 6 },
  footer: { backgroundColor: colors.footer, borderRadius: radius.lg, padding: spacing.lg, alignItems: 'center' },
  footerVerse: { fontFamily: fonts.serif, fontStyle: 'italic', color: colors.footerText, fontSize: 16, textAlign: 'center' },
  footerRef: { color: colors.accent, fontWeight: '700', marginTop: 6 },
  footerCopy: { color: colors.footerText, opacity: 0.6, fontSize: 12, marginTop: 12 },
});

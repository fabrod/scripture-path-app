import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Card, Serif } from '../components/ui';
import { colors, spacing, radius } from '../lib/theme';
import { TRANSLATIONS } from '../lib/bible';
import { getSettings, saveSettings } from '../lib/storage';

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [translation, setTranslation] = useState('kjv');

  useEffect(() => { getSettings().then((s) => setTranslation(s.translation || 'kjv')); }, []);

  const pick = (id) => {
    setTranslation(id);
    getSettings().then((s) => saveSettings({ ...s, translation: id }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Settings" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.sectionHead}>DEFAULT TRANSLATION</Text>
        <Card>
          {TRANSLATIONS.map((t) => (
            <TouchableOpacity key={t.id} style={styles.row} onPress={() => pick(t.id)}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{t.short} — {t.name}</Text>
                {t.attribution ? <Text style={styles.rowSub}>Licensed · attribution shown in reader</Text> : <Text style={styles.rowSub}>Public domain</Text>}
              </View>
              <Text style={styles.check}>{translation === t.id ? '✓' : ''}</Text>
            </TouchableOpacity>
          ))}
        </Card>

        <Text style={styles.sectionHead}>ABOUT</Text>
        <Card>
          <Text style={styles.about}>Scripture Path helps you grow closer to God every day — devotionals, the Bible in 15 translations, audio reading, and prayer. Free, with no account required.</Text>
          <Text style={styles.version}>Version 1.0.0 · © 2026 Real Scripture Path Inc.</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.md },
  sectionHead: { fontSize: 12, fontWeight: '800', letterSpacing: 1.5, color: colors.textLight, marginBottom: 8, marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  rowSub: { fontSize: 12, color: colors.textLight, marginTop: 2 },
  check: { fontSize: 20, color: colors.accent, fontWeight: '800', width: 28, textAlign: 'center' },
  about: { fontSize: 15, lineHeight: 23, color: colors.text },
  version: { fontSize: 12, color: colors.textLight, marginTop: 12 },
});

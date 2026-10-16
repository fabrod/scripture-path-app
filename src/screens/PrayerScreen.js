import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput,
  ActivityIndicator, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Card, Serif, PillButton } from '../components/ui';
import { colors, radius, spacing } from '../lib/theme';
import { api } from '../lib/api';
import { getMyPrayers, addMyPrayer, togglePrayerAnswered, removeMyPrayer } from '../lib/storage';

export default function PrayerScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('community'); // community | mine
  const [prayers, setPrayers] = useState([]);
  const [mine, setMine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    Promise.all([api.prayers().catch(() => ({ prayers: [] })), getMyPrayers()])
      .then(([p, m]) => { setPrayers(p.prayers || []); setMine(m); })
      .finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    if (!text.trim()) return;
    setSending(true);
    try {
      await api.submitPrayer(text.trim());
      await addMyPrayer(text.trim());
      setMine(await getMyPrayers());
      setText('');
      Alert.alert('Shared', 'Your prayer request has been shared. We\'re praying with you. 🙏');
    } catch {
      Alert.alert('Not sent', 'Couldn\'t share right now — your prayer was saved to your list.');
      await addMyPrayer(text.trim());
      setMine(await getMyPrayers());
      setText('');
    } finally { setSending(false); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Community Prayer" onBack={() => navigation.goBack()} />

      <View style={styles.tabs}>
        {['community', 'mine'].map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.tabActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'community' ? '🙏 Pray for Others' : '📝 My Prayers'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 60 }} size="large" color={colors.accent} />
      ) : tab === 'community' ? (
        <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
          <Card tinted>
            <Text style={styles.cardText}>
              No account needed. Share a request below, or lift up someone else in prayer.
            </Text>
          </Card>

          <TextInput
            style={styles.input}
            placeholder="Share a prayer request… (anonymous)"
            placeholderTextColor={colors.textLight}
            multiline
            value={text}
            onChangeText={setText}
          />
          <PillButton title={sending ? 'Sharing…' : 'Share Prayer Request'} onPress={submit} />

          <Text style={styles.sectionHead}>FEATURED PRAYERS</Text>
          {prayers.map((p, i) => (
            <Card key={i}>
              <Text style={styles.prayerText}>"{p.text}"</Text>
              <Text style={styles.prayerCat}>{p.category}</Text>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
          {mine.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyCircle}><Text style={{ fontSize: 40 }}>🙏</Text></View>
              <Serif size={20} style={{ marginTop: 12 }}>Your prayer list is empty</Serif>
              <Text style={styles.emptySub}>Shared requests appear here. Tap one when God answers. ✝</Text>
            </View>
          ) : mine.map((p) => (
            <Card key={p.id}>
              <Text style={[styles.prayerText, p.answered && styles.answered]}>{p.text}</Text>
              <View style={styles.prayerRow}>
                <TouchableOpacity onPress={async () => { await togglePrayerAnswered(p.id); setMine(await getMyPrayers()); }}>
                  <Text style={styles.prayerAction}>{p.answered ? '✅ Answered' : 'Mark answered'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => { await removeMyPrayer(p.id); setMine(await getMyPrayers()); }}>
                  <Text style={styles.prayerDelete}>Remove</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </ScrollView>
      )}
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
  cardText: { fontSize: 14, color: colors.text, lineHeight: 21 },
  input: {
    backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md,
    fontSize: 15, color: colors.text, minHeight: 90, textAlignVertical: 'top',
    borderWidth: 1, borderColor: colors.border, marginBottom: 10,
  },
  sectionHead: { fontSize: 12, fontWeight: '800', letterSpacing: 1.5, color: colors.textLight, marginTop: 16, marginBottom: 4 },
  prayerText: { fontFamily: 'Georgia', fontSize: 16, lineHeight: 24, color: colors.text },
  answered: { textDecorationLine: 'line-through', opacity: 0.6 },
  prayerCat: { color: colors.accent, fontSize: 12, fontWeight: '700', marginTop: 8 },
  prayerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  prayerAction: { color: colors.accent, fontWeight: '700', fontSize: 14 },
  prayerDelete: { color: colors.textLight, fontSize: 14 },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.tintPink, alignItems: 'center', justifyContent: 'center' },
  emptySub: { color: colors.textLight, marginTop: 6, textAlign: 'center', paddingHorizontal: 24 },
});

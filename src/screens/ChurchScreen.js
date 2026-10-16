import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import Header from '../components/Header';
import { Card, Serif, PillButton } from '../components/ui';
import { colors, spacing } from '../lib/theme';
import { api } from '../lib/api';

export default function ChurchScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [churches, setChurches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const find = async () => {
    setLoading(true); setError('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setError('Location permission is needed to find nearby churches.'); setLoading(false); return; }
      const loc = await Location.getCurrentPositionAsync({});
      const r = await api.churches(loc.coords.latitude, loc.coords.longitude);
      setChurches(r.churches || []);
    } catch (e) {
      setError('Church finder isn\'t connected yet — check back soon.');
    } finally { setLoading(false); }
  };

  const openMaps = (c) => {
    const q = encodeURIComponent(`${c.name} ${c.address || ''}`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${q}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Find a Church" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
        {churches === null && !loading && (
          <View style={styles.empty}>
            <View style={styles.emptyCircle}><Text style={{ fontSize: 40 }}>⛪</Text></View>
            <Serif size={22} style={{ marginTop: 12 }}>Find Your Church Family</Serif>
            <Text style={styles.emptySub}>Find Christian churches in your neighborhood and connect with a local community of believers. No sign-in needed.</Text>
            <PillButton title="Search Near Me" onPress={find} style={{ marginTop: 16 }} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
        )}

        {loading && <ActivityIndicator style={{ marginTop: 60 }} size="large" color={colors.accent} />}

        {churches !== null && (
          <>
            <Text style={styles.count}>{churches.length === 0 ? 'No churches found nearby.' : `${churches.length} churches near you`}</Text>
            {churches.map((c, i) => (
              <TouchableOpacity key={i} onPress={() => openMaps(c)}>
                <Card>
                  <Text style={styles.name}>{c.name}</Text>
                  {c.address ? <Text style={styles.addr}>{c.address}</Text> : null}
                  <Text style={styles.link}>Open in Maps →</Text>
                </Card>
              </TouchableOpacity>
            ))}
            <PillButton title="Search Again" outline onPress={find} style={{ marginTop: 8 }} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.md },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.tintPink, alignItems: 'center', justifyContent: 'center' },
  emptySub: { color: colors.textLight, marginTop: 8, textAlign: 'center', paddingHorizontal: 24, lineHeight: 22 },
  error: { color: colors.accent, marginTop: 12, textAlign: 'center' },
  count: { color: colors.textLight, fontSize: 13, marginBottom: 8 },
  name: { fontWeight: '700', fontSize: 16, color: colors.text },
  addr: { color: colors.textLight, fontSize: 14, marginTop: 4 },
  link: { color: colors.accent, fontWeight: '700', fontSize: 14, marginTop: 8 },
});

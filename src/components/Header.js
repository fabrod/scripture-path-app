import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../lib/theme';

// White sticky header: back arrow + centered title (+ optional right action)
export default function Header({ title, onBack, right }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={onBack} style={styles.side} hitSlop={12}>
        <Text style={styles.back}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={styles.side}>{right || null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  side: { width: 48, alignItems: 'center' },
  back: { fontSize: 32, color: colors.text, lineHeight: 34, marginTop: -4 },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    fontFamily: fonts.sans,
  },
});

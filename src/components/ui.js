import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, fonts, radius, shadow, spacing } from '../lib/theme';

// Terracotta filled pill button
export function PillButton({ title, onPress, outline, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pill, outline ? styles.outline : styles.filled, style]}
      activeOpacity={0.85}
    >
      <Text style={[styles.pillText, outline ? styles.outlineText : styles.filledText]}>{title}</Text>
    </TouchableOpacity>
  );
}

// White/cream card with soft shadow
export function Card({ children, tinted, style }) {
  return (
    <View style={[styles.card, tinted && styles.tinted, style]}>{children}</View>
  );
}

export function Serif({ children, style, size = 22 }) {
  return <Text style={[{ fontFamily: fonts.serif, fontSize: size, color: colors.text }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filled: { backgroundColor: colors.accent },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.accent },
  pillText: { fontSize: 16, fontWeight: '700' },
  filledText: { color: colors.white },
  outlineText: { color: colors.accent },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.card,
    marginVertical: spacing.sm,
  },
  tinted: { backgroundColor: colors.tintPink },
});

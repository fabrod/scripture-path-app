import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Card, PillButton, Serif } from '../components/ui';
import { colors, radius, spacing } from '../lib/theme';
import { api } from '../lib/api';

export default function ContactScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const send = async () => {
    if (!message.trim()) { Alert.alert('Missing message', 'Please write your message first.'); return; }
    setSending(true);
    try {
      await api.contact(name.trim(), email.trim(), message.trim());
      Alert.alert('Sent', 'Thanks for reaching out — we\'ll get back to you soon.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
      setName(''); setEmail(''); setMessage('');
    } catch {
      Alert.alert('Not sent', 'The contact form isn\'t connected yet. Please email us directly at fabrod035@gmail.com.');
    } finally { setSending(false); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Contact Us" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
        <Serif size={24}>We'd love to hear from you</Serif>
        <Text style={styles.sub}>Questions, feedback, or testimony — send us a note.</Text>

        <Card>
          <Text style={styles.label}>Your name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Jane" placeholderTextColor={colors.textLight} />
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="jane@example.com"
            placeholderTextColor={colors.textLight} keyboardType="email-address" autoCapitalize="none" />
          <Text style={styles.label}>Message</Text>
          <TextInput style={[styles.input, styles.multiline]} value={message} onChangeText={setMessage}
            placeholder="Write your message…" placeholderTextColor={colors.textLight} multiline textAlignVertical="top" />
          {sending
            ? <ActivityIndicator color={colors.accent} style={{ marginTop: 8 }} />
            : <PillButton title="Send Message" onPress={send} style={{ marginTop: 8 }} />}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.md },
  sub: { color: colors.textLight, marginTop: 6, marginBottom: 12, fontSize: 15 },
  label: { fontWeight: '700', fontSize: 13, color: colors.text, marginTop: 12, marginBottom: 6 },
  input: {
    backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: 12, fontSize: 15, color: colors.text,
  },
  multiline: { minHeight: 120 },
});

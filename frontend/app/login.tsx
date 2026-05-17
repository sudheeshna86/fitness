import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Lock, Mail } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Email and password are required.');
      return;
    }

    try {
      setLoading(true);
      const result = await login(email, password);
      if (result?.user) {
        router.push('/');
      } else {
        Alert.alert('Login failed', 'Invalid login response from the server.');
      }
    } catch (error: any) {
      Alert.alert('Login failed', error?.message || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to manage your training, progress, and admin workflows.</Text>

        <View style={styles.inputGroup}>
          <View style={styles.inputLabelRow}>
            <Mail size={18} color={Colors.onSurfaceVariant} />
            <Text style={styles.inputLabel}>Email</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={Colors.onSurfaceVariant}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputLabelRow}>
            <Lock size={18} color={Colors.onSurfaceVariant} />
            <Text style={styles.inputLabel}>Password</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={Colors.onSurfaceVariant}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button style={styles.submitButton} onPress={handleLogin} disabled={loading}>
          {loading ? 'Signing in…' : 'SIGN IN'}
        </Button>

        <TouchableOpacity onPress={() => router.push('/register')} style={styles.switchAction}>
          <Text style={styles.switchText}>New to FitnessApp? Create an account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  formContainer: {
    gap: 18,
  },
  title: {
    color: Colors.onSurface,
    fontSize: 34,
    fontWeight: '900',
  },
  subtitle: {
    color: Colors.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 24,
  },
  inputGroup: {
    gap: 10,
  },
  inputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: Colors.onSurface,
  },
  submitButton: {
    marginTop: 8,
  },
  switchAction: {
    alignItems: 'center',
    marginTop: 12,
  },
  switchText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

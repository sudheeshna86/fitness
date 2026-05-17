import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@/src/components/ui/Button';
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await register({ name, email, password, gender: 'other', age: 25, height: 165, weight: 70, fitnessGoals: ['Stay consistent', 'Track workouts'] });
      router.push('/');
    } catch (error: any) {
      Alert.alert('Registration failed', error?.message || 'Unable to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Join the fitness network and manage workouts, challenges, and analytics.</Text>

        <TextInput
          placeholder="Full name"
          placeholderTextColor={Colors.onSurfaceVariant}
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email address"
          placeholderTextColor={Colors.onSurfaceVariant}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.onSurfaceVariant}
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button style={styles.submitButton} onPress={handleRegister} disabled={loading}>
          {loading ? 'Creating account…' : 'REGISTER'}
        </Button>

        <Text style={styles.signInText}>Already have an account?</Text>
        <Button variant="secondary" style={styles.secondaryButton} onPress={() => router.push('/login')}>
          SIGN IN
        </Button>
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
  secondaryButton: {
    marginTop: 0,
    paddingVertical: 14,
  },
  signInText: {
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
  },
});

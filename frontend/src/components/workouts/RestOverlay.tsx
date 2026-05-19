import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  nextExercise: string;
  restTime: number;
}

export function RestOverlay({
  nextExercise,
  restTime,
}: Props) {
  return (
    <LinearGradient
      colors={[
        '#0F172A',
        '#111827',
      ]}
      style={styles.container}
    >
      <Text style={styles.restText}>
        Rest Time 💨
      </Text>

      <Text style={styles.timer}>
        {restTime}s
      </Text>

      <Text style={styles.next}>
        Next Exercise
      </Text>

      <Text style={styles.exercise}>
        {nextExercise}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    padding: 30,
  },

  restText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 24,
  },

  timer: {
    color: '#22C55E',
    fontSize: 90,
    fontWeight: '900',
    marginBottom: 28,
  },

  next: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    marginBottom: 12,
  },

  exercise: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
});
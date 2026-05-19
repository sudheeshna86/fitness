import React from 'react';

import {
  Moon,
} from 'lucide-react-native';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  sleep: any;
}

export function SleepCard({
  sleep,
}: Props) {
  const hours =
    sleep?.sleepHours || 0;

  const quality =
    sleep?.sleepQuality ||
    'Average';

  return (
    <View style={styles.container}>
      <Moon
        size={28}
        color="#8B5CF6"
      />

      <Text style={styles.title}>
        Sleep Tracking
      </Text>

      <Text style={styles.hours}>
        {hours} hrs
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {quality}
        </Text>
      </View>

      <Text style={styles.message}>
        Better sleep improves
        recovery and performance.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,

    borderRadius: 28,

    padding: 22,

    marginBottom: 22,
  },

  title: {
    color: Colors.onSurface,

    fontSize: 18,

    fontWeight: '900',

    marginTop: 14,
  },

  hours: {
    color: '#8B5CF6',

    fontSize: 36,

    fontWeight: '900',

    marginTop: 14,
  },

  badge: {
    alignSelf: 'flex-start',

    backgroundColor:
      'rgba(139,92,246,0.18)',

    paddingHorizontal: 16,

    paddingVertical: 10,

    borderRadius: 999,

    marginTop: 14,
  },

  badgeText: {
    color: '#C4B5FD',

    fontWeight: '800',
  },

  message: {
    color:
      Colors.onSurfaceVariant,

    lineHeight: 22,

    marginTop: 18,
  },
});
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Dumbbell,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

export function ChallengesEmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Dumbbell
          size={42}
          color={Colors.primary}
        />
      </View>

      <Text style={styles.title}>
        No Active Challenges
      </Text>

      <Text style={styles.text}>
        Join a challenge and start
        building your streak today.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 32,
    padding: 34,

    alignItems: 'center',

    marginBottom: 30,
  },

  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 999,

    backgroundColor:
      'rgba(59,130,246,0.12)',

    alignItems: 'center',
    justifyContent:
      'center',

    marginBottom: 18,
  },

  title: {
    color: Colors.onSurface,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },

  text: {
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
});
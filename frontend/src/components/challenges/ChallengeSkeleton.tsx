import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { Colors } from '@/src/constants/theme';

export function ChallengeSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.image} />

      <View style={styles.content}>
        <View style={styles.line1} />

        <View style={styles.line2} />

        <View style={styles.line3} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:
      Colors.card,

    borderRadius: 32,

    overflow: 'hidden',

    marginBottom: 24,
  },

  image: {
    width: '100%',
    height: 220,

    backgroundColor:
      Colors.border,
  },

  content: {
    padding: 22,
  },

  line1: {
    width: '60%',
    height: 22,

    borderRadius: 999,

    backgroundColor:
      Colors.border,

    marginBottom: 18,
  },

  line2: {
    width: '100%',
    height: 14,

    borderRadius: 999,

    backgroundColor:
      Colors.border,

    marginBottom: 12,
  },

  line3: {
    width: '80%',
    height: 14,

    borderRadius: 999,

    backgroundColor:
      Colors.border,
  },
});
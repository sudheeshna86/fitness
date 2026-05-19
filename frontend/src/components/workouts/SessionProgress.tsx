import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  current: number;
  total: number;
}

export function SessionProgress({
  current,
  total,
}: Props) {
  const progress =
    (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.label}>
          Workout Progress
        </Text>

        <Text style={styles.count}>
          {current}/{total}
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginBottom: 30,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',

    marginBottom: 10,
  },

  label: {
    color: Colors.onSurface,
    fontWeight: '700',
  },

  count: {
    color: Colors.primary,
    fontWeight: '900',
  },

  track: {
    height: 14,

    backgroundColor:
      'rgba(255,255,255,0.08)',

    borderRadius: 999,
    overflow: 'hidden',
  },

  fill: {
    height: '100%',

    backgroundColor:
      Colors.primary,

    borderRadius: 999,
  },
});
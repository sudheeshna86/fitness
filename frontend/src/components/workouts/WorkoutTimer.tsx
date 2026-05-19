import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  timeLeft: number;
}

export function WorkoutTimer({
  timeLeft,
}: Props) {
  const minutes = Math.floor(
    timeLeft / 60
  );

  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.time}>
          {String(minutes).padStart(
            2,
            '0'
          )}
          :
          {String(seconds).padStart(
            2,
            '0'
          )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },

  circle: {
    width: 240,
    height: 240,

    borderRadius: 999,

    borderWidth: 12,
    borderColor: Colors.primary,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor:
      'rgba(99,102,241,0.08)',
  },

  time: {
    color: Colors.onSurface,
    fontSize: 52,
    fontWeight: '900',
  },
});
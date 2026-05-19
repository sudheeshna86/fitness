import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Svg, {
  Circle,
} from 'react-native-svg';

import { Colors } from '@/src/constants/theme';

interface Props {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

export function AnimatedProgressRing({
  progress,
  size = 140,
  strokeWidth = 14,
}: Props) {
  const radius =
    (size - strokeWidth) / 2;

  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (circumference * progress) /
      100;

  return (
    <View style={styles.container}>
      <Svg
        width={size}
        height={size}
      >
        <Circle
          stroke={Colors.border}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={
            strokeWidth
          }
        />

        <Circle
          stroke={Colors.primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={
            strokeWidth
          }
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={
            strokeDashoffset
          }
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${
            size / 2
          }`}
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.percent}>
          {progress}%
        </Text>

        <Text style={styles.label}>
          Completed
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:
      'center',
  },

  center: {
    position: 'absolute',
    alignItems: 'center',
  },

  percent: {
    color: Colors.onSurface,
    fontSize: 28,
    fontWeight: '900',
  },

  label: {
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
});
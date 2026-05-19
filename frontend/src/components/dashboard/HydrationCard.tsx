import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Droplets,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  hydration: any;
}

export function HydrationCard({
  hydration,
}: Props) {
  const intake =
    hydration?.intakeAmount || 0;

  const goal =
    hydration?.goal || 3000;

  const percent = Math.min(
    100,
    Math.round((intake / goal) * 100)
  );

  return (
    <View style={styles.container}>
      <Droplets
        size={28}
        color="#38BDF8"
      />

      <Text style={styles.title}>
        Hydration
      </Text>

      <Text style={styles.amount}>
        {intake}ml
      </Text>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${percent}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.goal}>
        Goal: {goal}ml
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,

    borderRadius: 28,

    padding: 22,

    marginBottom: 20,
  },

  title: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 14,
  },

  amount: {
    color: '#38BDF8',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 12,
  },

  track: {
    height: 14,

    backgroundColor:
      'rgba(255,255,255,0.08)',

    borderRadius: 999,

    marginTop: 18,

    overflow: 'hidden',
  },

  fill: {
    height: '100%',

    backgroundColor:
      '#38BDF8',

    borderRadius: 999,
  },

  goal: {
    color:
      Colors.onSurfaceVariant,

    marginTop: 12,
  },
});
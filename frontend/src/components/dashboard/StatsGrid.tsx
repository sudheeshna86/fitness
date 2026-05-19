import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Dumbbell,
  Flame,
  Trophy,
  Zap,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  stats: any;
}

export function StatsGrid({
  stats,
}: Props) {
  const cards = [
    {
      icon: (
        <Flame
          size={24}
          color="#F97316"
        />
      ),

      label: 'Calories',

      value:
        stats?.caloriesBurned || 0,
    },

    {
      icon: (
        <Dumbbell
          size={24}
          color="#3B82F6"
        />
      ),

      label: 'Workouts',

      value:
        stats?.workoutsCompleted ||
        0,
    },

    {
      icon: (
        <Trophy
          size={24}
          color="#EAB308"
        />
      ),

      label: 'Challenges',

      value:
        stats?.challengesCompleted ||
        0,
    },

    {
      icon: (
        <Zap
          size={24}
          color="#A855F7"
        />
      ),

      label: 'Streak',

      value:
        stats?.streak || 0,
    },
  ];

  return (
    <View style={styles.grid}>
      {cards.map((item) => (
        <View
          key={item.label}
          style={styles.card}
        >
          {item.icon}

          <Text style={styles.value}>
            {item.value}
          </Text>

          <Text style={styles.label}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:
      'space-between',

    marginBottom: 24,
  },

  card: {
    width: '48%',

    backgroundColor: Colors.card,

    borderRadius: 28,

    padding: 22,

    marginBottom: 16,
  },

  value: {
    color: Colors.onSurface,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 14,
  },

  label: {
    color:
      Colors.onSurfaceVariant,

    marginTop: 6,
    fontSize: 14,
  },
});
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  completedDays: number[];
  totalDays: number;
}

export function DailyProgressGrid({
  completedDays,
  totalDays,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Daily Progress
      </Text>

      <View style={styles.grid}>
        {Array.from({
          length: totalDays,
        }).map((_, index) => {
          const day = index + 1;

          const completed =
            completedDays.includes(day);

          return (
            <View
              key={day}
              style={[
                styles.dayBox,

                completed &&
                  styles.completedDay,
              ]}
            >
              <Text
                style={[
                  styles.dayText,

                  completed &&
                    styles.completedText,
                ]}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },

  heading: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 18,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  dayBox: {
    width: 48,
    height: 48,
    borderRadius: 16,

    backgroundColor: Colors.card,

    alignItems: 'center',
    justifyContent: 'center',
  },

  completedDay: {
    backgroundColor: Colors.primary,
  },

  dayText: {
    color: Colors.onSurface,
    fontWeight: '700',
  },

  completedText: {
    color: '#FFFFFF',
  },
});
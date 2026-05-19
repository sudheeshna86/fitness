import React from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  LineChart,
} from 'react-native-chart-kit';

import { Colors } from '@/src/constants/theme';

interface Props {
  data: any[];
}

export function WeeklyChart({
  data,
}: Props) {
  const labels = data.map(
    (item) => item.day
  );

  const calories = data.map(
    (item) => item.calories
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Weekly Progress
      </Text>

      <LineChart
        data={{
          labels,
          datasets: [
            {
              data:
                calories.length > 0
                  ? calories
                  : [0],
            },
          ],
        }}
        width={
          Dimensions.get('window')
            .width - 70
        }
        height={240}
        yAxisSuffix="c"
        chartConfig={{
          backgroundGradientFrom:
            '#111827',

          backgroundGradientTo:
            '#111827',

          decimalPlaces: 0,

          color: (opacity = 1) =>
            `rgba(59,130,246,${opacity})`,

          labelColor: () =>
            '#FFFFFF',

          propsForDots: {
            r: '6',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',

    borderRadius: 30,

    paddingVertical: 22,

    marginBottom: 28,
  },

  title: {
    color: '#FFFFFF',

    fontSize: 22,

    fontWeight: '900',

    marginBottom: 18,

    paddingHorizontal: 22,
  },

  chart: {
    borderRadius: 24,
  },
});
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '@/src/constants/theme';

const screenWidth = Dimensions.get('window').width - 48;

interface EngagementChartProps {
  labels: string[];
  data: number[];
}

export function EngagementChart({ labels, data }: EngagementChartProps) {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={{ labels, datasets: [{ data }] }}
        width={screenWidth}
        height={220}
        withDots={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        withShadow
        chartConfig={{
          backgroundGradientFrom: Colors.surfaceLight,
          backgroundGradientTo: Colors.surface,
          color: () => Colors.primary,
          labelColor: () => Colors.onSurfaceVariant,
          fillShadowGradient: Colors.primary,
          fillShadowGradientOpacity: 0.2,
          propsForBackgroundLines: {
            stroke: Colors.border,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: Colors.primary,
            fill: Colors.primary,
          },
        }}
        bezier
        style={{ borderRadius: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },
});

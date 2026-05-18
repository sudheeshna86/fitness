import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Activity, Dumbbell, Weight } from 'lucide-react-native';

import { Card } from '@/src/components/ui/Card';
import { Colors } from '@/src/constants/theme';

interface Props {
  user: any;
}

export function ProfileStats({ user }: Props) {
  const stats = [
    {
      label: 'Workouts',
      value: user?.workoutsCompleted || 0,
      icon: <Dumbbell size={20} color={Colors.primary} />,
    },
    {
      label: 'BMI',
      value: user?.bmi?.toFixed(1) || '0',
      icon: <Activity size={20} color="#A855F7" />,
    },
    {
      label: 'Weight',
      value: `${user?.weight || 0}kg`,
      icon: <Weight size={20} color="#38BDF8" />,
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((item) => (
        <Card key={item.label} style={styles.card}>
          <View style={styles.iconWrap}>{item.icon}</View>

          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 22,
    borderRadius: 24,
  },
  iconWrap: {
    marginBottom: 12,
  },
  value: {
    color: Colors.onSurface,
    fontSize: 22,
    fontWeight: '800',
  },
  label: {
    marginTop: 6,
    color: Colors.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '600',
  },
});
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { Colors } from '@/src/constants/theme';

interface Props {
  user: any;
}

export function UserInfoCard({ user }: Props) {
  const rows = [
    {
      label: 'Age',
      value: user?.age || 'Not set',
    },
    {
      label: 'Gender',
      value: user?.gender || 'Not set',
    },
    {
      label: 'Height',
      value: user?.height ? `${user.height} cm` : 'Not set',
    },
    {
      label: 'Weight',
      value: user?.weight ? `${user.weight} kg` : 'Not set',
    },
  ];

  return (
    <Card style={styles.container}>
      <Text style={styles.heading}>Personal Information</Text>

      <View style={styles.content}>
        {rows.map((item, index) => (
          <View
            key={item.label}
            style={[
              styles.row,
              index !== rows.length - 1 && styles.border,
            ]}
          >
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
  },
  heading: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
  },
  content: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  label: {
    color: Colors.onSurfaceVariant,
    fontSize: 14,
  },
  value: {
    color: Colors.onSurface,
    fontSize: 15,
    fontWeight: '700',
  },
});
import React from 'react';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Colors } from '@/src/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    ...Platform.select({
      web: {
        boxShadow: '0px 14px 32px rgba(0, 0, 0, 0.2)',
      },
      default: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.2,
        shadowRadius: 32,
        elevation: 6,
      },
    }),
  },
});

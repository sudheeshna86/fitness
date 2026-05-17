import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Colors, Gradients } from '@/src/constants/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
}

const sizes = {
  sm: { paddingVertical: 10, paddingHorizontal: 14 },
  md: { paddingVertical: 14, paddingHorizontal: 18 },
  lg: { paddingVertical: 16, paddingHorizontal: 20 },
  icon: { padding: 12 },
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  onPress,
  disabled,
}: ButtonProps) {
    const contentStyles = [styles.button, sizes[size], style];
  const buttonContent = (
    <Text style={[styles.text, variant === 'ghost' && styles.ghostText, variant === 'outline' && styles.outlineText]}>{children}</Text>
  );

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed, disabled && styles.disabled, style]}
        disabled={disabled}
      >
        <LinearGradient colors={Gradients.brand} style={[styles.gradient, sizes[size], style || {}]}>
          {buttonContent}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [contentStyles, pressed && styles.pressed, disabled && styles.disabled]}
      disabled={disabled}
    >
      {buttonContent}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    flexDirection: 'row',
  },
  button: {
    borderRadius: 24,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: Colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  ghostText: {
    color: Colors.onSurface,
  },
  outlineText: {
    color: Colors.primary,
  },
});

import React from 'react';

import {
  LinearGradient,
} from 'expo-linear-gradient';

import {
  Sparkles,
} from 'lucide-react-native';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  message: string;
}

export function MotivationCard({
  message,
}: Props) {
  return (
    <LinearGradient
      colors={[
        '#7C3AED',
        '#2563EB',
      ]}
      style={styles.container}
    >
      <View style={styles.iconCircle}>
        <Sparkles
          size={26}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.title}>
        Daily Motivation
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,

    padding: 24,

    marginBottom: 24,
  },

  iconCircle: {
    width: 54,
    height: 54,

    borderRadius: 999,

    backgroundColor:
      'rgba(255,255,255,0.18)',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 18,
  },

  title: {
    color: '#FFFFFF',

    fontSize: 22,

    fontWeight: '900',
  },

  message: {
    color:
      'rgba(255,255,255,0.88)',

    marginTop: 14,

    lineHeight: 24,

    fontSize: 15,
  },
});
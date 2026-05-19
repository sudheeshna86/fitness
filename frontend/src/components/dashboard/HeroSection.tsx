import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  LinearGradient,
} from 'expo-linear-gradient';

import {
  Flame,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  user: any;
  motivationalMessage: string;
}

export function HeroSection({
  user,
  motivationalMessage,
}: Props) {
  return (
    <LinearGradient
      colors={[
        '#1E3A8A',
        '#2563EB',
        '#38BDF8',
      ]}
      style={styles.container}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>
            Welcome Back 👋
          </Text>

          <Text style={styles.name}>
            {user?.name}
          </Text>
        </View>

        <Image
          source={{
            uri:
              user?.profileImage ||
              'https://via.placeholder.com/150',
          }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.streakCard}>
        <Flame
          size={26}
          color="#F97316"
        />

        <Text style={styles.streakText}>
          {user?.streak || 0} Day
          Streak
        </Text>
      </View>

      <Text style={styles.message}>
        {motivationalMessage}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',

    alignItems: 'center',
  },

  greeting: {
    color:
      'rgba(255,255,255,0.7)',

    fontSize: 14,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 6,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 999,
    borderWidth: 3,
    borderColor:
      'rgba(255,255,255,0.4)',
  },

  streakCard: {
    marginTop: 28,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor:
      'rgba(255,255,255,0.15)',

    padding: 16,

    borderRadius: 22,
  },

  streakText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10,
  },

  message: {
    color: '#FFFFFF',
    marginTop: 20,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '600',
  },
});
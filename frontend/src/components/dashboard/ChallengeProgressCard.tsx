import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Trophy,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  challenge: any;
}

export function ChallengeProgressCard({
  challenge,
}: Props) {
  if (!challenge) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Trophy
          size={22}
          color="#EAB308"
        />

        <Text style={styles.title}>
          Active Challenge
        </Text>
      </View>

      <Text style={styles.challengeName}>
        {
          challenge.challenge.title
        }
      </Text>

      <Text style={styles.progress}>
        Day {challenge.currentDay}/
        {
          challenge.challenge
            .targetDays
        }
      </Text>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${challenge.progress}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.percent}>
        {challenge.progress}% Completed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,

    padding: 24,

    borderRadius: 30,

    marginBottom: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 10,
  },

  challengeName: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 20,
  },

  progress: {
    color:
      Colors.onSurfaceVariant,

    marginTop: 12,
  },

  track: {
    height: 16,

    backgroundColor:
      'rgba(255,255,255,0.08)',

    borderRadius: 999,

    overflow: 'hidden',

    marginTop: 20,
  },

  fill: {
    height: '100%',

    backgroundColor:
      Colors.primary,

    borderRadius: 999,
  },

  percent: {
    color: Colors.primary,
    marginTop: 12,
    fontWeight: '800',
  },
});
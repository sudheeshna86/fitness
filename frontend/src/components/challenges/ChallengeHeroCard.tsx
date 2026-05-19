import React from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Flame,
  Trophy,
} from 'lucide-react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '@/src/constants/theme';
import { getImageUrl } from '../../getImageUrl';
interface Props {
  challenge: any;
}

export function ChallengeHeroCard({
  challenge,
}: Props) {
  return (
    <ImageBackground
      source={{
            uri: getImageUrl(
        challenge?.challenge?.imageUrl ||
            challenge?.imageUrl
        ),
      }}
      style={styles.container}
      imageStyle={styles.image}
    >
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0.85)',
        ]}
        style={styles.overlay}
      >
        <View style={styles.badge}>
          <Flame
            size={14}
            color="#FB923C"
          />

          <Text style={styles.badgeText}>
            {challenge?.streak || 0} Day Streak
          </Text>
        </View>

        <Text style={styles.title}>
          {challenge?.challenge?.title ||
            challenge?.title}
        </Text>

        <Text style={styles.description}>
          {challenge?.challenge
            ?.description ||
            challenge?.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.progressContainer}>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  {
                    width: `${
                      challenge?.progress || 0
                    }%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.progressText}>
              {challenge?.progress || 0}%
              Completed
            </Text>
          </View>

          <View style={styles.rewardBadge}>
            <Trophy
              size={14}
              color="#FACC15"
            />

            <Text style={styles.rewardText}>
              +
              {challenge?.challenge
                ?.xpReward || 100}{' '}
              XP
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    borderRadius: 32,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
  },

  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

    backgroundColor:
      'rgba(255,255,255,0.12)',

    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,

    marginBottom: 14,
  },

  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
  },

  description: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },

  footer: {
    gap: 16,
  },

  progressContainer: {
    gap: 8,
  },

  track: {
    width: '100%',
    height: 12,
    borderRadius: 999,
    backgroundColor:
      'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },

  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#3B82F6',
  },

  progressText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  rewardBadge: {
    alignSelf: 'flex-start',

    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

    backgroundColor:
      'rgba(255,255,255,0.12)',

    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },

  rewardText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
});
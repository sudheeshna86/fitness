import React, {
  useEffect,
  useState,
} from 'react';

import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import {
  Flame,
  Trophy,
  Calendar,
} from 'lucide-react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { getImageUrl } from '../getImageUrl';
import {
  completeChallengeDay,
  fetchMyChallenges,
} from '@/src/services/api/challenges';
import { AnimatedProgressRing } from '@/src/components/challenges/AnimatedProgressRing';
import { Colors } from '@/src/constants/theme';

import { Button } from '@/src/components/ui/Button';

import { DailyProgressGrid } from '@/src/components/challenges/DailyProgressGrid';

export function ChallengeDetailScreen() {
  const { id } =
    useLocalSearchParams();

  const [challenge, setChallenge] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const loadChallenge =
    async () => {
      try {
        const response =
          await fetchMyChallenges();

        const selected =
          response.find(
            (item: any) =>
              item._id === id
          );

        setChallenge(selected);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadChallenge();
  }, []);

  const handleCompleteToday =
    async () => {
      try {
        setLoading(true);

        await completeChallengeDay(
          challenge._id
        );

        await loadChallenge();

        Alert.alert(
          'Great Job 🔥',
          'Today marked as completed.'
        );
      } catch (error: any) {
                const message =
            error?.response?.data?.message ||
            'Something went wrong';

        Alert.alert(
            'Challenge Update',
            message
  );
      } finally {
        setLoading(false);
      }
    };

  if (!challenge) {
    return null;
  }

  const completed =
    challenge.status ===
    'completed';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <ImageBackground
        source={{
        uri: getImageUrl(
  challenge.challenge.imageUrl
),
        }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <LinearGradient
          colors={[
            'rgba(0,0,0,0.15)',
            'rgba(0,0,0,0.92)',
          ]}
          style={styles.overlay}
        >
          <View style={styles.badge}>
            <Flame
              size={14}
              color="#FB923C"
            />

            <Text style={styles.badgeText}>
              {challenge.streak}{' '}
              Day Streak
            </Text>
          </View>

          <Text style={styles.title}>
            {
              challenge.challenge
                .title
            }
          </Text>

          <Text
            style={styles.description}
          >
            {
              challenge.challenge
                .description
            }
          </Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Calendar
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.statValue}>
            {
              challenge.currentDay
            }
            /
            {
              challenge.challenge
                .targetDays
            }
          </Text>

          <Text style={styles.statLabel}>
            Days
          </Text>
        </View>

        <View style={styles.statCard}>
          <Trophy
            size={22}
            color="#FACC15"
          />

          <Text style={styles.statValue}>
            {
              challenge.challenge
                .xpReward
            }
          </Text>

          <Text style={styles.statLabel}>
            XP Reward
          </Text>
        </View>
      </View>
    <View style={styles.progressRingWrap}>
    <AnimatedProgressRing
        progress={challenge.progress}
    />
    </View>

      <DailyProgressGrid
        completedDays={
          challenge.completedDays
        }
        totalDays={
          challenge.challenge
            .targetDays
        }
      />

      {completed ? (
        <View
          style={
            styles.completedCard
          }
        >
          <Trophy
            size={42}
            color="#FACC15"
          />

          <Text
            style={
              styles.completedTitle
            }
          >
            Challenge Completed
          </Text>

          <Text
            style={
              styles.completedText
            }
          >
            You unlocked a new
            achievement and earned
            XP rewards.
          </Text>
        </View>
      ) : (
        <Button
          style={styles.completeBtn}
          onPress={
            handleCompleteToday
          }
        >
          {loading
            ? 'Completing...'
            : 'Mark Today Complete'}
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    paddingBottom: 120,
  },

  hero: {
    height: 360,
    justifyContent: 'flex-end',
  },

  heroImage: {
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  overlay: {
    padding: 24,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
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

    marginBottom: 16,
  },

  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 10,
  },

  description: {
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 24,
    fontSize: 15,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 20,
    marginTop: 24,
  },

  statCard: {
    flex: 1,

    backgroundColor: Colors.card,

    padding: 22,
    borderRadius: 28,

    alignItems: 'center',
  },

  statValue: {
    color: Colors.onSurface,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 12,
  },

  statLabel: {
    color: Colors.onSurfaceVariant,
    marginTop: 6,
  },

  progressSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: 12,
  },

  progressTitle: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '800',
  },

  progressPercent: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },

  track: {
    width: '100%',
    height: 16,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor:
      Colors.border,
  },

  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor:
      Colors.primary,
  },

  completeBtn: {
    marginHorizontal: 20,
    marginTop: 36,
    borderRadius: 22,
    paddingVertical: 18,
  },

  completedCard: {
    marginHorizontal: 20,
    marginTop: 36,

    backgroundColor:
      'rgba(250,204,21,0.08)',

    padding: 30,
    borderRadius: 30,

    alignItems: 'center',
  },

  completedTitle: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 12,
  },

  completedText: {
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressRingWrap: {
  marginTop: 34,
  alignItems: 'center',
},
}); 
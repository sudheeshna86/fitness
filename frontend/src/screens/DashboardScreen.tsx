import React, {
  useCallback,
  useState,
} from 'react';

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import { Colors } from '@/src/constants/theme';

import {
  fetchDashboard,
} from '@/src/services/api/dashboard';

import { HeroSection } from '@/src/components/dashboard/HeroSection';
import { FeaturedWorkoutCard } from '@/src/components/dashboard/FeaturedWorkoutCard';

import { AchievementCard } from '@/src/components/dashboard/AchievementCard';

import { QuickActions } from '@/src/components/dashboard/QuickActions';
import { StatsGrid } from '@/src/components/dashboard/StatsGrid';

import { ChallengeProgressCard } from '@/src/components/dashboard/ChallengeProgressCard';

import { HydrationCard } from '@/src/components/dashboard/HydrationCard';

import { SleepCard } from '@/src/components/dashboard/SleepCard';

import { WeeklyChart } from '@/src/components/dashboard/WeeklyChart';

import { MotivationCard } from '@/src/components/dashboard/MotivationCard';

import { RecentWorkoutCard } from '@/src/components/dashboard/RecentWorkoutCard';

export function DashboardScreen() {
  const [dashboard, setDashboard] =
    useState<any>(null);

  const [refreshing, setRefreshing] =
    useState(false);

  const loadDashboard =
    async () => {
      try {
        const response =
          await fetchDashboard();

        setDashboard(
          response.dashboard
        );
      } catch (error) {
        console.log(error);
      }
    };

  useFocusEffect(
    useCallback(() => {
      loadDashboard();
    }, [])
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await loadDashboard();
    } finally {
      setRefreshing(false);
    }
  };

  if (!dashboard) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <HeroSection
        user={dashboard.user}
        motivationalMessage={
          dashboard.motivationalMessage
        }
      />

      <StatsGrid
        stats={dashboard.stats}
      />

      <ChallengeProgressCard
        challenge={
          dashboard.activeChallenge
        }
      />

      <FeaturedWorkoutCard
  workout={
    dashboard.featuredWorkout
  }
/>

      <HydrationCard
        hydration={
          dashboard.hydration
        }
      />

      <SleepCard
        sleep={dashboard.sleep}
      />

      <MotivationCard
        message="Your future body is built by what you do today."
      />

      <WeeklyChart
        data={
          dashboard.weeklyProgress
        }
      />

      <Text style={styles.sectionTitle}>
        Recent Workouts
      </Text>

      {dashboard.recentWorkouts.map(
        (item: any) => (
          <RecentWorkoutCard
            key={item._id}
            item={item}
          />
        )
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
    padding: 20,
    paddingBottom: 120,
  },

  sectionTitle: {
    color: Colors.onSurface,

    fontSize: 26,

    fontWeight: '900',

    marginBottom: 18,
  },
});
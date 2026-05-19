import React, {
  useCallback,
  useState,
} from 'react';

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import { useRouter } from 'expo-router';

import {
  Dumbbell,
  Flame,
  Zap,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

import { WorkoutCard } from '@/src/components/workouts/WorkoutCard';

import {
  fetchWorkouts,
} from '@/src/services/api/workouts';

export function WorkoutsScreen() {
  const router = useRouter();

  const [refreshing, setRefreshing] =
    useState(false);

  const [workouts, setWorkouts] =
    useState<any[]>([]);

  const loadData = async () => {
    try {
      const response =
        await fetchWorkouts();

      setWorkouts(
        response?.workouts ||
          response ||
          []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await loadData();
    } finally {
      setRefreshing(false);
    }
  };

  const featuredWorkout =
    workouts[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <Text style={styles.heading}>
        Workouts
      </Text>

      <Text style={styles.subheading}>
        Train smarter. Build
        consistency. Transform your
        body.
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Dumbbell
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.statValue}>
            {workouts.length}
          </Text>

          <Text style={styles.statLabel}>
            Programs
          </Text>
        </View>

        <View style={styles.statCard}>
          <Flame
            size={22}
            color="#FB923C"
          />

          <Text style={styles.statValue}>
            1200+
          </Text>

          <Text style={styles.statLabel}>
            Calories
          </Text>
        </View>

        <View style={styles.statCard}>
          <Zap
            size={22}
            color="#FACC15"
          />

          <Text style={styles.statValue}>
            Pro
          </Text>

          <Text style={styles.statLabel}>
            Intensity
          </Text>
        </View>
      </View>

      {featuredWorkout && (
        <>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Featured Workout
          </Text>

          <WorkoutCard
            workout={
              featuredWorkout
            }
            onPress={() =>
              router.push(
                `/workout/${featuredWorkout._id}`
              )
            }
          />
        </>
      )}

      <Text style={styles.sectionTitle}>
        Workout Programs
      </Text>

      {workouts.map((workout) => (
        <WorkoutCard
          key={workout._id}
          workout={workout}
          onPress={() =>
            router.push(
              `/workout/${workout._id}`
            )
          }
        />
      ))}
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

  heading: {
    color: Colors.onSurface,
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 10,
  },

  subheading: {
    color: Colors.onSurfaceVariant,
    lineHeight: 24,
    marginBottom: 30,
    fontSize: 15,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },

  statCard: {
    flex: 1,

    backgroundColor: Colors.card,

    padding: 18,
    borderRadius: 22,

    alignItems: 'center',
  },

  statValue: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 10,
  },

  statLabel: {
    color: Colors.onSurfaceVariant,
    marginTop: 6,
    fontSize: 12,
  },

  sectionTitle: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 18,
  },
});
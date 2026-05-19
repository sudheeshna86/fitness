import React, {
  useEffect,
  useState,
} from 'react';

import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import {
  Clock3,
  Dumbbell,
  Flame,
} from 'lucide-react-native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  fetchWorkoutById,
} from '@/src/services/api/workouts';

import { Colors } from '@/src/constants/theme';

import { getImageUrl } from '@/src/utils/getImageUrl';

import { ExerciseCard } from '@/src/components/workouts/ExerciseCard';

import { Button } from '@/src/components/ui/Button';

export function WorkoutDetailScreen() {
  const { id } =
    useLocalSearchParams();

  const router = useRouter();

  const [workout, setWorkout] =
    useState<any>(null);

  const loadWorkout =
    async () => {
      try {
        const response =
          await fetchWorkoutById(
            id as string
          );

        setWorkout(
          response?.workout ||
            response
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadWorkout();
  }, []);

  if (!workout) {
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
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
    >
      <ImageBackground
        source={{
          uri: getImageUrl(
            workout.thumbnail
          ),
        }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0,0,0,0.92)',
          ]}
          style={styles.overlay}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {
                workout.difficulty
              }
            </Text>
          </View>

          <Text style={styles.title}>
            {workout.title}
          </Text>

          <Text
            style={
              styles.description
            }
          >
            {
              workout.description
            }
          </Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Clock3
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.statValue}>
            {workout.duration}
          </Text>

          <Text style={styles.statLabel}>
            Minutes
          </Text>
        </View>

        <View style={styles.statCard}>
          <Flame
            size={22}
            color="#FB923C"
          />

          <Text style={styles.statValue}>
            {
              workout.caloriesBurn
            }
          </Text>

          <Text style={styles.statLabel}>
            Calories
          </Text>
        </View>

        <View style={styles.statCard}>
          <Dumbbell
            size={22}
            color="#FACC15"
          />

          <Text style={styles.statValue}>
            {
              workout.exercises
                ?.length
            }
          </Text>

          <Text style={styles.statLabel}>
            Exercises
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Exercises
      </Text>

      {workout.exercises?.map(
        (
          exercise: any,
          index: number
        ) => (
          <ExerciseCard
            key={exercise._id}
            exercise={exercise}
            index={index}
            onPress={() =>
              router.push(
                `/exercise/${exercise._id}`
              )
            }
          />
        )
      )}

      <Button
        style={styles.startButton}
        onPress={() =>
          router.push(
            `/workout-session/${workout._id}`
          )
        }
      >
        Start Workout Session
      </Button>
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
    flexGrow: 1,
    paddingBottom: 300,
  },

  hero: {
    height: 260,
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

    backgroundColor:
      'rgba(255,255,255,0.15)',

    paddingHorizontal: 14,
    paddingVertical: 10,

    borderRadius: 999,

    marginBottom: 18,
  },

  badgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 12,
  },

  description: {
    color:
      'rgba(255,255,255,0.72)',

    lineHeight: 24,
  },

  statsRow: {
    flexDirection: 'row',

    gap: 12,

    paddingHorizontal: 20,

    marginTop: 26,
    marginBottom: 34,
  },

  statCard: {
    flex: 1,

    backgroundColor:
      Colors.card,

    padding: 18,

    borderRadius: 22,

    alignItems: 'center',
  },

  statValue: {
    color: Colors.onSurface,

    fontSize: 22,
    fontWeight: '900',

    marginTop: 12,
  },

  statLabel: {
    color:
      Colors.onSurfaceVariant,

    marginTop: 6,
    fontSize: 12,
  },

  sectionTitle: {
    color: Colors.onSurface,

    fontSize: 26,
    fontWeight: '900',

    marginBottom: 20,

    paddingHorizontal: 20,
  },

  startButton: {
    marginHorizontal: 20,

    marginTop: 30,
    marginBottom: 60,

    borderRadius: 24,

    paddingVertical: 18,
  },
});
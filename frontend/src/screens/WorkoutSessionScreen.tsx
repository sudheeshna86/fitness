import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import {
  Pause,
  Play,
  SkipForward,
  X,
} from 'lucide-react-native';

import {
  fetchWorkoutById,
} from '@/src/services/api/workouts';

import { Colors } from '@/src/constants/theme';

import { getImageUrl } from '@/src/utils/getImageUrl';

import { WorkoutTimer } from '@/src/components/workouts/WorkoutTimer';

import { SessionProgress } from '@/src/components/workouts/SessionProgress';

import { RestOverlay } from '@/src/components/workouts/RestOverlay';

export function WorkoutSessionScreen() {
  const { id } =
    useLocalSearchParams();

  const router = useRouter();

  const [workout, setWorkout] =
    useState<any>(null);

  const [
    currentExerciseIndex,
    setCurrentExerciseIndex,
  ] = useState(0);

  const [timeLeft, setTimeLeft] =
    useState<number | null>(null);

  const [isPaused, setIsPaused] =
    useState(false);

  const [isResting, setIsResting] =
    useState(false);

  const exercises = useMemo(
    () => workout?.exercises || [],
    [workout]
  );

  const currentExercise =
    exercises[
      currentExerciseIndex
    ];

  const nextExercise =
    exercises[
      currentExerciseIndex + 1
    ];

  const loadWorkout =
    async () => {
      try {
        const response =
          await fetchWorkoutById(
            id as string
          );

        const data =
          response?.workout ||
          response;

        setWorkout(data);

        if (
          data?.exercises?.length > 0
        ) {
          setTimeLeft(
            Number(
              data.exercises[0]
                ?.duration || 30
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadWorkout();
  }, []);

  useEffect(() => {
    if (
      timeLeft === null ||
      isPaused
    )
      return;

    const interval =
      setInterval(() => {
        setTimeLeft((prev) => {
          if (!prev) return 0;

          return prev - 1;
        });
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [timeLeft, isPaused]);

  useEffect(() => {
    if (
      timeLeft === null
    )
      return;

    if (timeLeft > 0)
      return;

    if (isResting) {
      moveToNextExercise();
    } else {
      startRest();
    }
  }, [timeLeft]);

  const startRest = () => {
    if (!nextExercise) {
      router.replace(
        `/workout-complete/${id}`
      );

      return;
    }

    setIsResting(true);

    setTimeLeft(
      Number(
        currentExercise
          ?.restTime || 15
      )
    );
  };

  const moveToNextExercise =
    () => {
      const nextIndex =
        currentExerciseIndex + 1;

      if (
        nextIndex >=
        exercises.length
      ) {
        router.replace(
          `/workout-complete/${id}`
        );

        return;
      }

      setCurrentExerciseIndex(
        nextIndex
      );

      setIsResting(false);

      setTimeLeft(
        Number(
          exercises[nextIndex]
            ?.duration || 30
        )
      );
    };

  if (
    !workout ||
    !currentExercise
  ) {
    return null;
  }

  if (isResting) {
    return (
      <RestOverlay
        nextExercise={
          nextExercise?.name ||
          ''
        }
        restTime={timeLeft || 0}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 80,
      }}
      showsVerticalScrollIndicator={
        false
      }
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            router.back()
          }
        >
          <X
            size={22}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.workout}>
          {workout.title}
        </Text>

        <View
          style={styles.placeholder}
        />
      </View>

      <SessionProgress
        current={
          currentExerciseIndex + 1
        }
        total={exercises.length}
      />

      <Image
        source={{
          uri: getImageUrl(
            currentExercise.imageUrl
          ),
        }}
        style={styles.image}
      />

      <Text style={styles.exercise}>
        {currentExercise.name}
      </Text>

      <Text style={styles.target}>
        {
          currentExercise.targetMuscle
        }
      </Text>

      <WorkoutTimer
        timeLeft={timeLeft || 0}
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() =>
            setIsPaused(
              !isPaused
            )
          }
        >
          {isPaused ? (
            <Play
              size={26}
              color="#FFFFFF"
            />
          ) : (
            <Pause
              size={26}
              color="#FFFFFF"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={
            moveToNextExercise
          }
        >
          <SkipForward
            size={26}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {nextExercise && (
        <View
          style={styles.nextCard}
        >
          <Text
            style={
              styles.nextLabel
            }
          >
            Next Exercise
          </Text>

          <Text
            style={
              styles.nextExercise
            }
          >
            {nextExercise.name}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      '#0F172A',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    marginBottom: 20,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor:
      'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  workout: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },

  placeholder: {
    width: 44,
  },

  image: {
    width: '100%',
    height: 260,
    borderRadius: 32,
    marginBottom: 28,
  },

  exercise: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
  },

  target: {
    color:
      'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
  },

  controls: {
    flexDirection: 'row',
    justifyContent:
      'center',
    gap: 20,
    marginTop: 10,
  },

  controlButton: {
    width: 74,
    height: 74,
    borderRadius: 999,
    backgroundColor:
      Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  skipButton: {
    width: 74,
    height: 74,
    borderRadius: 999,
    backgroundColor:
      '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextCard: {
    marginTop: 40,
    backgroundColor:
      'rgba(255,255,255,0.06)',
    padding: 22,
    borderRadius: 26,
  },

  nextLabel: {
    color:
      'rgba(255,255,255,0.6)',
    marginBottom: 8,
  },

  nextExercise: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
});
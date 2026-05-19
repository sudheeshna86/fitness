import React, {
  useEffect,
  useState,
} from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useLocalSearchParams,
} from 'expo-router';

import {
  Flame,
  Target,
  Timer,
} from 'lucide-react-native';

import {
  fetchExerciseById,
} from '@/src/services/api/exercises';

import { Colors } from '@/src/constants/theme';

import { getImageUrl } from '../getImageUrl';

export function ExerciseDetailScreen() {
  const { id } =
    useLocalSearchParams();

  const [exercise, setExercise] =
    useState<any>(null);

  const loadExercise =
    async () => {
      try {
        const response =
          await fetchExerciseById(
            id as string
          );

        setExercise(
          response?.exercise ||
            response
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadExercise();
  }, []);

  if (!exercise) {
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
    >
      <Image
        source={{
          uri: getImageUrl(
            exercise.imageUrl
          ),
        }}
        style={styles.image}
      />

      <View style={styles.header}>
        <Text style={styles.title}>
          {exercise.name}
        </Text>

        <Text
          style={styles.description}
        >
          {
            exercise.description
          }
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Timer
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.statValue}>
            {
              exercise.duration
            }
            s
          </Text>

          <Text style={styles.statLabel}>
            Duration
          </Text>
        </View>

        <View style={styles.statCard}>
          <Flame
            size={22}
            color="#FB923C"
          />

          <Text style={styles.statValue}>
            {
              exercise.caloriesBurn
            }
          </Text>

          <Text style={styles.statLabel}>
            Calories
          </Text>
        </View>

        <View style={styles.statCard}>
          <Target
            size={22}
            color="#FACC15"
          />

          <Text style={styles.statValue}>
            {
              exercise.targetMuscle
            }
          </Text>

          <Text style={styles.statLabel}>
            Target
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Instructions
      </Text>

      {exercise.instructions?.map(
        (
          instruction: string,
          index: number
        ) => (
          <View
            key={index}
            style={
              styles.instructionCard
            }
          >
            <View
              style={
                styles.numberBadge
              }
            >
              <Text
                style={
                  styles.numberText
                }
              >
                {index + 1}
              </Text>
            </View>

            <Text
              style={
                styles.instructionText
              }
            >
              {instruction}
            </Text>
          </View>
        )
      )}

      <Text style={styles.sectionTitle}>
        Pro Tips
      </Text>

      {exercise.tips?.map(
        (
          tip: string,
          index: number
        ) => (
          <View
            key={index}
            style={styles.tipCard}
          >
            <Text style={styles.tipText}>
              • {tip}
            </Text>
          </View>
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
    paddingBottom: 120,
  },

  image: {
    width: '100%',
    height: 320,
  },

  header: {
    padding: 20,
  },

  title: {
    color: Colors.onSurface,
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 14,
  },

  description: {
    color: Colors.onSurfaceVariant,
    lineHeight: 24,
    fontSize: 15,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
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
    fontWeight: '900',
    fontSize: 18,
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
    paddingHorizontal: 20,
  },

  instructionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    backgroundColor: Colors.card,

    marginHorizontal: 20,
    marginBottom: 14,

    padding: 18,

    borderRadius: 22,
  },

  numberBadge: {
    width: 34,
    height: 34,

    borderRadius: 999,

    backgroundColor:
      Colors.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 14,
  },

  numberText: {
    color: '#FFFFFF',
    fontWeight: '900',
  },

  instructionText: {
    flex: 1,

    color: Colors.onSurface,
    lineHeight: 24,
  },

  tipCard: {
    backgroundColor: Colors.card,

    marginHorizontal: 20,
    marginBottom: 14,

    padding: 18,

    borderRadius: 22,
  },

  tipText: {
    color: Colors.onSurface,
    lineHeight: 24,
  },
});
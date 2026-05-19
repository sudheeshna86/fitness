import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { Trophy } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';

export function WorkoutCompleteScreen() {
  const router = useRouter();

  const { id } =
    useLocalSearchParams();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.contentContainer
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <View style={styles.iconCircle}>
        <Trophy
          size={80}
          color="#FACC15"
        />
      </View>

      <Text style={styles.title}>
        Workout Complete 🎉
      </Text>

      <Text style={styles.subtitle}>
        Amazing work today. Keep
        pushing your limits and stay
        consistent.
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.stat}>
          🔥 Calories Burned: 320
        </Text>

        <Text style={styles.stat}>
          ⏱ Duration: 24 min
        </Text>

        <Text style={styles.stat}>
          🏆 XP Earned: +150 XP
        </Text>
      </View>

      <Button
        style={styles.button}
        onPress={() =>
          router.replace('/tabs')
        }
      >
        Back To Dashboard
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  contentContainer: {
    flexGrow: 1,

    alignItems: 'center',

    paddingHorizontal: 30,

    paddingTop: 70,

    paddingBottom: 140,
  },

  iconCircle: {
    width: 180,
    height: 180,

    borderRadius: 999,

    backgroundColor:
      'rgba(255,255,255,0.08)',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 34,
  },

  title: {
    color: '#FFFFFF',

    fontSize: 38,

    fontWeight: '900',

    marginBottom: 18,

    textAlign: 'center',
  },

  subtitle: {
    color:
      'rgba(255,255,255,0.7)',

    textAlign: 'center',

    lineHeight: 26,

    marginBottom: 36,

    fontSize: 16,
  },

  statsCard: {
    width: '100%',

    backgroundColor:
      'rgba(255,255,255,0.06)',

    borderRadius: 28,

    padding: 24,

    marginBottom: 40,
  },

  stat: {
    color: '#FFFFFF',

    fontSize: 18,

    marginBottom: 18,

    fontWeight: '700',
  },

  button: {
    width: '100%',

    borderRadius: 20,

    marginBottom: 80,
  },
});
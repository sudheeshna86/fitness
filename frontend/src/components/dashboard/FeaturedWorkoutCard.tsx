import React from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useRouter,
} from 'expo-router';

import {
  Clock3,
  Flame,
} from 'lucide-react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '@/src/constants/theme';

import { Button } from '@/src/components/ui/Button';

import { getImageUrl } from '@/src/utils/getImageUrl';

interface Props {
  workout: any;
}

export function FeaturedWorkoutCard({
  workout,
}: Props) {
  const router = useRouter();

  if (!workout) {
    return null;
  }

  return (
    <ImageBackground
      source={{
        uri: getImageUrl(
          workout.thumbnail
        ),
      }}
      style={styles.container}
      imageStyle={styles.image}
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
            Featured
          </Text>
        </View>

        <Text style={styles.title}>
          {workout.title}
        </Text>

        <Text style={styles.description}>
          {workout.description}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.meta}>
            <Clock3
              size={16}
              color="#FFFFFF"
            />

            <Text style={styles.metaText}>
              {workout.duration} mins
            </Text>
          </View>

          <View style={styles.meta}>
            <Flame
              size={16}
              color="#FB923C"
            />

            <Text style={styles.metaText}>
              {
                workout.caloriesBurn
              }{' '}
              cal
            </Text>
          </View>
        </View>

        <Button
          style={styles.button}
          onPress={() =>
            router.push(
              `/workout/${workout._id}`
            )
          }
        >
          Start Workout
        </Button>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320,

    borderRadius: 34,

    overflow: 'hidden',

    marginBottom: 28,
  },

  image: {
    borderRadius: 34,
  },

  overlay: {
    flex: 1,

    justifyContent: 'flex-end',

    padding: 24,
  },

  badge: {
    alignSelf: 'flex-start',

    backgroundColor:
      'rgba(255,255,255,0.18)',

    paddingHorizontal: 16,

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

    fontSize: 30,

    fontWeight: '900',

    marginBottom: 12,
  },

  description: {
    color:
      'rgba(255,255,255,0.78)',

    lineHeight: 24,

    marginBottom: 18,
  },

  metaRow: {
    flexDirection: 'row',

    gap: 18,

    marginBottom: 24,
  },

  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaText: {
    color: '#FFFFFF',

    marginLeft: 8,

    fontWeight: '700',
  },

  button: {
    borderRadius: 20,
  },
});
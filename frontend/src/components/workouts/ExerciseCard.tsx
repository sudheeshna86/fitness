import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ChevronRight,
  Timer,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

import { getImageUrl } from '../../getImageUrl';

interface Props {
  exercise: any;
  index: number;
  onPress: () => void;
}

export function ExerciseCard({
  exercise,
  index,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={{
          uri: getImageUrl(
            exercise.imageUrl
          ),
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.index}>
          Exercise {index + 1}
        </Text>

        <Text style={styles.name}>
          {exercise.name}
        </Text>

        <View style={styles.meta}>
          <Timer
            size={15}
            color={
              Colors.onSurfaceVariant
            }
          />

          <Text style={styles.metaText}>
            {exercise.duration}s
          </Text>
        </View>
      </View>

      <ChevronRight
        size={22}
        color={Colors.onSurfaceVariant}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: Colors.card,

    marginBottom: 16,
    padding: 14,

    borderRadius: 22,
  },

  image: {
    width: 82,
    height: 82,
    borderRadius: 18,
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  index: {
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 6,
  },

  name: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },

  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  metaText: {
    color: Colors.onSurfaceVariant,
  },
});
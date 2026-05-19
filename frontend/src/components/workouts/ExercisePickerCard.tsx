import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  CheckCircle2,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

import { getImageUrl } from '../../getImageUrl';

interface Props {
  exercise: any;
  selected: boolean;
  onPress: () => void;
}

export function ExercisePickerCard({
  exercise,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[
        styles.container,

        selected &&
          styles.selected,
      ]}
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
        <Text style={styles.name}>
          {exercise.name}
        </Text>

        <Text style={styles.target}>
          {
            exercise.targetMuscle
          }
        </Text>
      </View>

      {selected && (
        <CheckCircle2
          size={26}
          color={
            Colors.primary
          }
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor:
      Colors.card,

    padding: 14,

    borderRadius: 22,

    marginBottom: 16,
  },

  selected: {
    borderWidth: 2,
    borderColor:
      Colors.primary,
  },

  image: {
    width: 78,
    height: 78,

    borderRadius: 18,
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },

  target: {
    color:
      Colors.onSurfaceVariant,
  },
});
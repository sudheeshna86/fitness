import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Flame,
  Timer,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

import { getImageUrl } from '@/src/utils/getImageUrl';

interface Props {
  item: any;
}

export function RecentWorkoutCard({
  item,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: getImageUrl(
            item?.workout?.thumbnail
          ),
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {
            item?.workout?.title
          }
        </Text>

        <View style={styles.metaRow}>
          <Timer
            size={14}
            color={
              Colors.onSurfaceVariant
            }
          />

          <Text style={styles.metaText}>
            {item?.duration} mins
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Flame
            size={14}
            color="#FB923C"
          />

          <Text style={styles.metaText}>
            {
              item?.caloriesBurned
            }{' '}
            cal
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    backgroundColor: Colors.card,

    borderRadius: 24,

    overflow: 'hidden',

    marginBottom: 18,
  },

  image: {
    width: 120,
    height: 120,
  },

  content: {
    flex: 1,

    padding: 18,

    justifyContent: 'center',
  },

  title: {
    color: Colors.onSurface,

    fontSize: 18,

    fontWeight: '900',

    marginBottom: 16,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 10,
  },

  metaText: {
    color:
      Colors.onSurfaceVariant,

    marginLeft: 8,
  },
});
import React from 'react';

import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Clock3,
  Flame,
} from 'lucide-react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '@/src/constants/theme';

import { getImageUrl } from '@/src/utils/getImageUrl';

interface Props {
  workout: any;

  onPress: () => void;
}

export function WorkoutCard({
  workout,
  onPress,
}: Props) {
  const image =
    getImageUrl(
      workout?.thumbnail
    );

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <ImageBackground
        source={{
          uri:
            image ||
            'https://via.placeholder.com/400',
        }}
        style={styles.image}
        imageStyle={
          styles.imageStyle
        }
      >
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0,0,0,0.92)',
          ]}
          style={styles.overlay}
        >
          <View style={styles.topRow}>
            <View style={styles.badge}>
              <Text
                style={
                  styles.badgeText
                }
              >
                {
                  workout?.difficulty
                }
              </Text>
            </View>

            <View
              style={styles.category}
            >
              <Text
                style={
                  styles.categoryText
                }
              >
                {
                  workout?.category
                }
              </Text>
            </View>
          </View>

          <Text style={styles.title}>
            {workout?.title}
          </Text>

          <Text
            numberOfLines={2}
            style={
              styles.description
            }
          >
            {
              workout?.description
            }
          </Text>

          <View
            style={styles.footer}
          >
            <View
              style={
                styles.footerItem
              }
            >
              <Clock3
                size={16}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.footerText
                }
              >
                {
                  workout?.duration
                }{' '}
                mins
              </Text>
            </View>

            <View
              style={
                styles.footerItem
              }
            >
              <Flame
                size={16}
                color="#FB923C"
              />

              <Text
                style={
                  styles.footerText
                }
              >
                {
                  workout?.caloriesBurn
                }{' '}
                kcal
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  image: {
    height: 280,

    justifyContent:
      'flex-end',
  },

  imageStyle: {
    borderRadius: 34,
  },

  overlay: {
    padding: 22,

    borderRadius: 34,
  },

  topRow: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    marginBottom: 14,
  },

  badge: {
    backgroundColor:
      'rgba(255,255,255,0.18)',

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 999,
  },

  badgeText: {
    color: '#FFFFFF',

    fontWeight: '800',
  },

  category: {
    backgroundColor:
      'rgba(59,130,246,0.25)',

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 999,
  },

  categoryText: {
    color: '#FFFFFF',

    fontWeight: '700',
  },

  title: {
    color: '#FFFFFF',

    fontSize: 28,

    fontWeight: '900',

    marginBottom: 10,
  },

  description: {
    color:
      'rgba(255,255,255,0.72)',

    lineHeight: 22,

    marginBottom: 18,
  },

  footer: {
    flexDirection: 'row',

    gap: 20,
  },

  footerItem: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,
  },

  footerText: {
    color: '#FFFFFF',

    fontWeight: '700',
  },
});
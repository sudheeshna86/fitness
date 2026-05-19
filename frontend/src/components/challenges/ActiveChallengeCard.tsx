import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Flame,
  Trophy,
} from 'lucide-react-native';
import { getImageUrl } from '../../getImageUrl';
import { Colors } from '@/src/constants/theme';

interface Props {
  item: any;
  onPress: () => void;
}

export function ActiveChallengeCard({
  item,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={{
                uri: getImageUrl(
        item?.challenge?.imageUrl
        ),
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.streakBadge}>
            <Flame
              size={14}
              color="#FB923C"
            />

            <Text style={styles.streakText}>
              {item?.streak || 0} Day
              Streak
            </Text>
          </View>

          <View style={styles.xpBadge}>
            <Trophy
              size={14}
              color="#FACC15"
            />

            <Text style={styles.xpText}>
              +
              {item?.challenge
                ?.xpReward || 100}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>
          {item?.challenge?.title}
        </Text>

        <Text style={styles.dayText}>
          Day {item?.currentDay}/
          {
            item?.challenge
              ?.targetDays
          }
        </Text>

        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              {
                width: `${
                  item?.progress || 0
                }%`,
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 18,
  },

  image: {
    width: '100%',
    height: 180,
  },

  content: {
    padding: 20,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,

    backgroundColor:
      'rgba(251,146,60,0.12)',

    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  streakText: {
    color: '#FB923C',
    fontWeight: '700',
    fontSize: 12,
  },

  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,

    backgroundColor:
      'rgba(250,204,21,0.12)',

    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  xpText: {
    color: '#FACC15',
    fontWeight: '700',
    fontSize: 12,
  },

  title: {
    color: Colors.onSurface,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },

  dayText: {
    color: Colors.onSurfaceVariant,
    marginBottom: 14,
  },

  track: {
    width: '100%',
    height: 12,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: Colors.border,
  },

  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
});
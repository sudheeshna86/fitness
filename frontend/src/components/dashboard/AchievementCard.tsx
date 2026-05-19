import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Award,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

interface Props {
  achievements: string[];
}

export function AchievementCard({
  achievements,
}: Props) {
  if (
    !achievements ||
    achievements.length === 0
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Achievements
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
      >
        {achievements.map(
          (item, index) => (
            <View
              key={index}
              style={styles.badge}
            >
              <Award
                size={20}
                color="#FACC15"
              />

              <Text style={styles.text}>
                {item}
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  title: {
    color: Colors.onSurface,

    fontSize: 24,

    fontWeight: '900',

    marginBottom: 18,
  },

  badge: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor:
      Colors.card,

    paddingHorizontal: 18,

    paddingVertical: 14,

    borderRadius: 999,

    marginRight: 14,
  },

  text: {
    color: Colors.onSurface,

    marginLeft: 10,

    fontWeight: '800',
  },
});
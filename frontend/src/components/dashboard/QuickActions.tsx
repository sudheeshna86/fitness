import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  useRouter,
} from 'expo-router';

import {
  Dumbbell,
  Trophy,
  Droplets,
} from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';

interface Props {}

export function QuickActions(
  {}: Props
) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={() =>
          router.push('/tabs/workouts')
        }
      >
        <Dumbbell
          size={18}
          color="#FFFFFF"
        />
      </Button>

      <Button
        style={styles.button}
        onPress={() =>
          router.push(
            '/tabs/challenges'
          )
        }
      >
        <Trophy
          size={18}
          color="#FFFFFF"
        />
      </Button>

      <Button
        style={styles.button}
        onPress={() =>
          router.push('/tabs/water')
        }
      >
        <Droplets
          size={18}
          color="#FFFFFF"
        />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    marginBottom: 28,
  },

  button: {
    flex: 1,

    marginHorizontal: 6,

    borderRadius: 22,
  },
});
import React, {
  useCallback,
  useState,
} from 'react';

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import { useRouter } from 'expo-router';

import {
  fetchChallenges,
  fetchMyChallenges,
  joinChallenge,
} from '@/src/services/api/challenges';

import { ChallengesEmptyState } from '../components/challenges/ChallengesEmptyState';

import { Colors } from '@/src/constants/theme';

import { Button } from '@/src/components/ui/Button';

import { ChallengeHeroCard } from '@/src/components/challenges/ChallengeHeroCard';

import { ActiveChallengeCard } from '@/src/components/challenges/ActiveChallengeCard';

export function ChallengesScreen() {
  const router = useRouter();

  const [refreshing, setRefreshing] =
    useState(false);

  const [allChallenges, setAllChallenges] =
    useState<any[]>([]);

  const [myChallenges, setMyChallenges] =
    useState<any[]>([]);

  const loadData = async () => {
    try {
      const [
        challengesResponse,
        joinedResponse,
      ] = await Promise.all([
        fetchChallenges(),
        fetchMyChallenges(),
      ]);

    setAllChallenges(
  challengesResponse?.challenges ||
    challengesResponse ||
    []
);

setMyChallenges(
  joinedResponse?.challenges ||
    joinedResponse ||
    []
);
    } catch (error) {
      console.log(error);
    }
  };

  // IMPORTANT FIX
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await loadData();
    } finally {
      setRefreshing(false);
    }
  };

  const handleJoin = async (
    id: string
  ) => {
    try {
      await joinChallenge(id);

      await loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <Text style={styles.heading}>
        Challenges
      </Text>

      <Text style={styles.subheading}>
        Stay consistent. Build streaks.
        Unlock achievements.
      </Text>

      {myChallenges.length > 0 ? (
        <>
          <Text
            style={
              styles.sectionTitle
            }
          >
            Active Challenge
          </Text>

          <ChallengeHeroCard
            challenge={
              myChallenges[0]
            }
          />

          <Text
            style={
              styles.sectionTitle
            }
          >
            Continue Challenges
          </Text>

          {myChallenges.map(
            (item) => (
              <ActiveChallengeCard
                key={item._id}
                item={item}
                onPress={() =>
                  router.push(
                    `/challenge/${item._id}`
                  )
                }
              />
            )
          )}
        </>
      ) : (
        <ChallengesEmptyState />
      )}

      <Text style={styles.sectionTitle}>
        Discover Challenges
      </Text>

      {allChallenges.map((item) => {
        const joined =
          myChallenges.find(
            (challenge) =>
              challenge.challenge
                ._id === item._id
          );

        return (
          <View
            key={item._id}
            style={styles.challengeCard}
          >
            <ChallengeHeroCard
              challenge={item}
            />

            {!joined ? (
              <Button
                style={
                  styles.joinButton
                }
                onPress={() =>
                  handleJoin(
                    item._id
                  )
                }
              >
                Join Challenge
              </Button>
            ) : (
              <Button
                variant="secondary"
                style={
                  styles.joinButton
                }
                onPress={() =>
                  router.push(
                    `/challenge/${joined._id}`
                  )
                }
              >
                Continue Challenge
              </Button>
            )}
          </View>
        );
      })}
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
    padding: 20,
    paddingBottom: 120,
  },

  heading: {
    color: Colors.onSurface,
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 8,
  },

  subheading: {
    color: Colors.onSurfaceVariant,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 28,
  },

  sectionTitle: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 18,
  },

  challengeCard: {
    marginBottom: 28,
  },

  joinButton: {
    marginTop: 16,
    marginHorizontal: 24,
    marginBottom: 10,
    borderRadius: 18,
  },
});
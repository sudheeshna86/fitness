import React, {
  useEffect,
  useState,
} from 'react';

import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Pencil,
  Trash2,
  Trophy,
  Users,
} from 'lucide-react-native';

import { useRouter } from 'expo-router';
import { getImageUrl } from '../getImageUrl';
import {
  deleteChallenge,
  fetchChallenges,
} from '@/src/services/api/challenges';

import { Colors } from '@/src/constants/theme';

import { Button } from '@/src/components/ui/Button';

export function ManageChallengesScreen() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [challenges, setChallenges] =
    useState<any[]>([]);

  const loadChallenges =
    async () => {
      try {
        const response =
          await fetchChallenges();

        setChallenges(response);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadChallenges();
  }, []);

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await loadChallenges();
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete =
    async (id: string) => {
      try {
        setLoading(true);

        await deleteChallenge(id);

        await loadChallenges();

        Alert.alert(
          'Deleted',
          'Challenge deleted successfully'
        );
      } catch (error) {
        Alert.alert(
          'Error',
          'Unable to delete challenge'
        );
      } finally {
        setLoading(false);
      }
    };

  const totalParticipants =
    challenges.reduce(
      (acc, item) =>
        acc +
        (item.participantsCount ||
          0),
      0
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={challenges}
        keyExtractor={(item) =>
          item._id
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={
          styles.content
        }
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>
              Manage Challenges
            </Text>

            <Text
              style={
                styles.subheading
              }
            >
              Create engaging fitness
              experiences for users.
            </Text>

            <View
              style={styles.analyticsRow}
            >
              <View
                style={
                  styles.analyticsCard
                }
              >
                <Trophy
                  size={24}
                  color="#FACC15"
                />

                <Text
                  style={
                    styles.analyticsValue
                  }
                >
                  {
                    challenges.length
                  }
                </Text>

                <Text
                  style={
                    styles.analyticsLabel
                  }
                >
                  Challenges
                </Text>
              </View>

              <View
                style={
                  styles.analyticsCard
                }
              >
                <Users
                  size={24}
                  color="#38BDF8"
                />

                <Text
                  style={
                    styles.analyticsValue
                  }
                >
                  {
                    totalParticipants
                  }
                </Text>

                <Text
                  style={
                    styles.analyticsLabel
                  }
                >
                  Participants
                </Text>
              </View>
            </View>

            <Button
              style={styles.createBtn}
              onPress={() =>
                router.push(
                  '/admin/new-challenge'
                )
              }
            >
              Create New Challenge
            </Button>
          </>
        }
        renderItem={({ item }) => (
          <View
            style={styles.card}
          >
            <Image
              source={{
                uri: getImageUrl(
  item.imageUrl
),
              }}
              style={styles.image}
            />

            <View
              style={styles.cardContent}
            >
              <View
                style={styles.topRow}
              >
                <View
                  style={
                    styles.categoryBadge
                  }
                >
                  <Text
                    style={
                      styles.categoryText
                    }
                  >
                    {item.category}
                  </Text>
                </View>

                <View
                  style={
                    styles.difficultyBadge
                  }
                >
                  <Text
                    style={
                      styles.difficultyText
                    }
                  >
                    {
                      item.difficulty
                    }
                  </Text>
                </View>
              </View>

              <Text
                style={styles.title}
              >
                {item.title}
              </Text>

              <Text
                style={
                  styles.description
                }
                numberOfLines={2}
              >
                {
                  item.description
                }
              </Text>

              <View
                style={
                  styles.statsRow
                }
              >
                <Text
                  style={
                    styles.statsText
                  }
                >
                  👥{' '}
                  {
                    item.participantsCount
                  }{' '}
                  Joined
                </Text>

                <Text
                  style={
                    styles.statsText
                  }
                >
                  🏆 +
                  {item.xpReward}{' '}
                  XP
                </Text>
              </View>

              <View
                style={
                  styles.actionRow
                }
              >
                <TouchableOpacity
                  style={
                    styles.editBtn
                  }
                >
                  <Pencil
                    size={18}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.deleteBtn
                  }
                  onPress={() =>
                    handleDelete(
                      item._id
                    )
                  }
                >
                  <Trash2
                    size={18}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
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
    lineHeight: 24,
    marginBottom: 26,
  },

  analyticsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },

  analyticsCard: {
    flex: 1,

    backgroundColor:
      Colors.card,

    borderRadius: 28,

    padding: 22,

    alignItems: 'center',
  },

  analyticsValue: {
    color: Colors.onSurface,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 12,
  },

  analyticsLabel: {
    color:
      Colors.onSurfaceVariant,
    marginTop: 6,
  },

  createBtn: {
    borderRadius: 22,
    marginBottom: 30,
  },

  card: {
    backgroundColor:
      Colors.card,

    borderRadius: 32,
    overflow: 'hidden',

    marginBottom: 24,
  },

  image: {
    width: '100%',
    height: 220,
  },

  cardContent: {
    padding: 22,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',

    marginBottom: 16,
  },

  categoryBadge: {
    backgroundColor:
      'rgba(59,130,246,0.12)',

    paddingHorizontal: 14,
    paddingVertical: 10,

    borderRadius: 999,
  },

  categoryText: {
    color: Colors.primary,
    fontWeight: '700',
  },

  difficultyBadge: {
    backgroundColor:
      'rgba(251,146,60,0.12)',

    paddingHorizontal: 14,
    paddingVertical: 10,

    borderRadius: 999,
  },

  difficultyText: {
    color: '#FB923C',
    fontWeight: '700',
  },

  title: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },

  description: {
    color:
      Colors.onSurfaceVariant,
    lineHeight: 24,
    marginBottom: 18,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',

    marginBottom: 20,
  },

  statsText: {
    color: Colors.onSurface,
    fontWeight: '700',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },

  editBtn: {
    flex: 1,

    backgroundColor:
      Colors.primary,

    borderRadius: 18,

    paddingVertical: 16,

    alignItems: 'center',
  },

  deleteBtn: {
    flex: 1,

    backgroundColor:
      Colors.error,

    borderRadius: 18,

    paddingVertical: 16,

    alignItems: 'center',
  },
});
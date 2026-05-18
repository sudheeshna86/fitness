import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Flame, Search } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { workoutService } from '@/src/services/workoutService';
import { Workout } from '@/src/types';
import { Colors } from '@/src/constants/theme';

const categoryList = ['ALL', 'HIIT', 'YOGA', 'STRENGTH', 'RECOVERY'];

// Define Props for the Animated Card
interface AnimatedWorkoutCardProps {
  item: Workout;
  index: number;
  onPress: () => void;
}

// AnimatedWorkoutCard component for animated workout cards
function AnimatedWorkoutCard({ item, index, onPress }: AnimatedWorkoutCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 80,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, index]);

  return (
    <Animated.View style={{ opacity: fadeAnim, marginBottom: 24 }}>
      <Card style={styles.featuredCard}>
        <Image source={{ uri: item.image }} style={styles.featuredImage} />
        {item.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.badgeText}>FEATURED MASTERCLASS</Text>
          </View>
        )}
        <View style={styles.featuredText}>
          <Text style={styles.featuredTitle}>{item.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={16} color={Colors.primary} />
              <Text style={styles.metaText}>{item.duration} MIN</Text>
            </View>
            <View style={styles.metaItem}>
              <Flame size={16} color={Colors.tertiary} />
              <Text style={styles.metaText}>{item.calories} KCAL</Text>
            </View>
          </View>
          <Button style={styles.startButton} onPress={onPress}>
            Start Workout
          </Button>
        </View>
      </Card>
    </Animated.View>
  );
}

export function WorkoutsScreen() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await workoutService.getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error('Failed to load workouts:', error);
      }
    };
    loadWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesCategory =
      selectedCategory === 'ALL' || workout.category.toUpperCase() === selectedCategory;
    const matchesSearch =
      workout.title.toLowerCase().includes(query.toLowerCase()) ||
      workout.trainer.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.content}>
        <View style={styles.searchField}>
          <Search size={20} color={Colors.onSurfaceVariant} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search workouts, trainers..."
            placeholderTextColor={Colors.onSurfaceVariant}
            style={styles.input}
          />
        </View>
        <View style={styles.categoryRow}>
          {categoryList.map((item) => {
            const active = item === selectedCategory;
            return (
              <Button
                key={item}
                variant={active ? 'primary' : 'secondary'}
                style={[styles.categoryButton, active && styles.categoryActive]}
                onPress={() => setSelectedCategory(item)}
              >
                {item}
              </Button>
            );
          })}
        </View>
      </View>
      
      <FlatList
        data={filteredWorkouts}
        renderItem={({ item, index }) => (
          <AnimatedWorkoutCard
            item={item}
            index={index}
            onPress={() =>
              router.push({
                pathname: '/workout-detail/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No workouts found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 24,
    paddingHorizontal: 24,
    gap: 18,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    color: Colors.onSurface,
    height: 48,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  categoryButton: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categoryActive: {
    backgroundColor: Colors.primary,
  },
  featuredCard: {
    padding: 0,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: 260,
  },
  featuredBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  featuredText: {
    padding: 20,
    backgroundColor: Colors.surface,
  },
  featuredTitle: {
    color: Colors.onSurface,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  startButton: {
    marginTop: 8,
  },
  emptyText: {
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 40,
  },
  // Retaining your extra unused styles below in case they are used in extended layouts
  sectionHeading: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  popularList: {
    gap: 16,
  },
  workoutRow: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    alignItems: 'center',
  },
  workoutImage: {
    width: 90,
    height: 90,
    borderRadius: 18,
  },
  workoutBody: {
    flex: 1,
    gap: 6,
  },
  workoutTitle: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '800',
  },
  workoutMeta: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  statText: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
});
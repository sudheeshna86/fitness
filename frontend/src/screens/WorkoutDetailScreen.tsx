import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Clock, Flame, Dumbbell, Heart, Zap, MoreVertical } from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { fetchWorkoutById, completeWorkout } from '@/src/services/api/workouts';
import Constants from 'expo-constants';
import { Workout } from '@/src/types';
import { Colors } from '@/src/constants/theme';

export function WorkoutDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [workout, setWorkout] = useState<Workout | undefined>();
  const [completing, setCompleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (typeof id === 'string') {
      fetchWorkoutById(id).then(setWorkout);
    }
  }, [id]);

  useEffect(() => {
    if (workout) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }
  }, [workout]);

  const handleComplete = async () => {
    if (typeof id !== 'string') return;
    try {
      setCompleting(true);
      await completeWorkout(id);
      Alert.alert('Great job!', 'Workout marked as complete.');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Unable to complete workout.');
    } finally {
      setCompleting(false);
    }
  };

  if (!workout) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading workout…</Text>
      </View>
    );
  }

  // Helper to get correct image URL
  const getImageUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    // Use backend URL from env or fallback
    const backendUrl = Constants.expoConfig?.extra?.apiUrl?.replace(/\/api$/, '') || 'http://localhost:4000';
    if (url.startsWith('/')) return backendUrl + url;
    return backendUrl + '/uploads/' + url;
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        {imageError || !workout.thumbnail ? (
          <View style={[styles.heroImage, styles.heroImageFallback]}>
            <Text style={styles.heroImageFallbackText}>No Image</Text>
          </View>
        ) : (
          <Image
            source={{ uri: getImageUrl(workout.thumbnail) }}
            style={styles.heroImage}
            onError={() => setImageError(true)}
            resizeMode="cover"
          />
        )}
        <LinearGradient
          colors={["rgba(7,10,18,0.7)", "rgba(7,10,18,0.1)", "rgba(7,10,18,0.7)"]}
          style={styles.gradientOverlay}
          pointerEvents="none"
        />
        <View style={styles.overlay} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color={Colors.onSurface} />
        </TouchableOpacity>
        <View style={styles.heroDetails}>
          <View style={styles.badgesRow}>
            <View style={styles.badgeSecondary}><Text style={styles.badgeText}>{workout.difficulty}</Text></View>
            <View style={styles.badgeSecondary}><Text style={styles.badgeText}>{workout.duration} MINS</Text></View>
          </View>
          <Text style={styles.heroTitle}>{workout.title}</Text>
          <Text style={styles.heroSubtitle}>WORKOUT DETAILS</Text>
        </View>
        <View style={styles.motivationalQuoteBox}>
          <Text style={styles.motivationalQuote}>
            "Push yourself, because no one else is going to do it for you."
          </Text>
        </View>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Card style={styles.statsCard}>
          <StatBlock icon={<Flame size={20} color={Colors.error} />} value={`${workout.caloriesBurn}`} label="KCAL" />
          <StatBlock icon={<Clock size={20} color={Colors.primary} />} value={`${workout.duration}`} label="MINS" />
          <StatBlock icon={<Dumbbell size={20} color={Colors.secondary} />} value={`${workout.exercises?.length ?? 0}`} label="EXERCISES" />
        </Card>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.smallCardsRow}>
          <Card style={styles.smallCard}>
            <View style={styles.smallCardLabelRow}>
              <Heart size={20} color={Colors.error} />
              <Text style={styles.smallCardLabel}>AVG HEART RATE</Text>
            </View>
            <Text style={styles.smallCardValue}>142 bpm</Text>
          </Card>
          <Card style={styles.smallCard}>
            <View style={styles.smallCardLabelRow}>
              <Zap size={20} color={Colors.secondary} />
              <Text style={styles.smallCardLabel}>INTENSITY</Text>
            </View>
            <Text style={styles.smallCardValue}>High</Text>
          </Card>
        </View>
      </Animated.View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Movement Flow</Text>
        <Text style={styles.sectionMeta}>{workout.exercises?.length ?? 0} Movements</Text>
      </View>

      {workout.exercises?.map((exercise, index) => (
        <Animated.View key={exercise._id || exercise.name + index} style={{ opacity: fadeAnim }}>
          <View style={styles.movementRow}>
            <View style={styles.movementIndex}><Text style={styles.movementIndexText}>{String(index + 1).padStart(2, '0')}</Text></View>
            <Card style={styles.movementCard}>
              {exercise.image ? (
                <Image source={{ uri: exercise.image }} style={styles.movementImage} resizeMode="cover" />
              ) : (
                <View style={[styles.movementImage, styles.heroImageFallback]}>
                  <Text style={styles.heroImageFallbackText}>No Image</Text>
                </View>
              )}
              <View style={styles.movementBody}>
                <Text style={styles.movementTitle}>{exercise.name}</Text>
                <Text style={styles.movementMeta}>{exercise.sets} Sets • {exercise.reps} Reps</Text>
              </View>
              <MoreVertical size={18} color={Colors.onSurfaceVariant} />
            </Card>
          </View>
        </Animated.View>
      ))}

      <Animated.View style={{ opacity: fadeAnim }}>
        <Button
          style={styles.startSessionButton}
          onPress={handleComplete}
          disabled={completing}
          textStyle={styles.startSessionButtonText}
        >
          {completing ? 'Completing...' : 'Start Session'}
        </Button>
      </Animated.View>
    </ScrollView>
  );
}

function StatBlock({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <View style={styles.statBlock}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  heroImageFallback: {
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImageFallbackText: {
    color: Colors.onSurfaceVariant,
    fontSize: 18,
    fontWeight: '700',
  },
  motivationalQuoteBox: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
    padding: 12,
    zIndex: 2,
  },
  motivationalQuote: {
    color: Colors.primary,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '700',
  },
  content: {
    padding: 24,
    paddingBottom: 120,
    gap: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  loadingText: {
    color: Colors.onSurface,
    fontSize: 16,
  },
  hero: {
    height: 420,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceLight,
    marginBottom: 0,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 10, 18, 0.55)',
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heroDetails: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 28,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  badgeSecondary: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  badgeText: {
    color: Colors.onSurface,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: Colors.onSurface,
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 6,
  },
  heroSubtitle: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '900',
    color: Colors.onSurface,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  smallCardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  smallCard: {
    flex: 1,
    padding: 18,
  },
  smallCardLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  smallCardLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  smallCardValue: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '900',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionMeta: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  movementRow: {
    marginBottom: 12,
  },
  movementIndex: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  movementIndexText: {
    color: Colors.onSurfaceVariant,
    fontWeight: '800',
  },
  movementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
  },
  movementImage: {
    width: 68,
    height: 68,
    borderRadius: 18,
  },
  movementBody: {
    flex: 1,
  },
  movementTitle: {
    color: Colors.onSurface,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  movementMeta: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  startSessionButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  startSessionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});

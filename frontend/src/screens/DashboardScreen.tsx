import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowRight, Droplets, Flame, Moon, Trophy, Dumbbell } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { useAuth } from '@/src/hooks/useAuth';
import { fetchAnalytics } from '@/src/services/api/analytics';
import { workoutService } from '@/src/services/workoutService';
import { Colors } from '@/src/constants/theme';

const challenges = [
  { name: 'Plank Master', sub: '3 min plank hold', xp: '50 XP', color: '#F97316', done: false },
  { name: 'Hydration King', sub: 'Drink 3L of water', xp: '80 XP', color: '#3B82F6', done: true },
  { name: 'Morning Cardio', sub: '5km running session', xp: '120 XP', color: '#A855F7', done: false },
];

export function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [featuredWorkouts, setFeaturedWorkouts] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const analyticsData = await fetchAnalytics();
        setAnalytics(analyticsData);
        const workouts = await fetchWorkouts();
        setFeaturedWorkouts(workouts.slice(0, 2));
      } catch (error: any) {
        console.warn('Dashboard load failed', error?.message || error);
      }
    };

    if (user) {
      loadData();
    }
  }, [user]);

  const userFirstName = user?.name.split(' ')[0] ?? 'Athlete';
  const activeMinutes = analytics?.meta?.activeUsers ? Math.round((analytics.meta.activeUsers / 10) + 30) : 54;

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroInner}>
          <View style={styles.heroTitleRow}>
            <View style={styles.heroIconShell}>
              <Dumbbell size={20} color={Colors.onSurface} />
            </View>
            <Text style={styles.heroTitle}>
              FitTrack<Text style={styles.heroAccent}>Pro</Text>
            </Text>
          </View>
          <Text style={styles.heroHeading}>Welcome back, {userFirstName}! 👋</Text>
          <Text style={styles.heroDescription}>
            Your current streak is {user?.streak ?? 0} days. Keep the momentum going.
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <Text style={styles.statValue}>{analytics?.weeklyHydration?.length ? analytics.weeklyHydration.slice(-1)[0]?.totalIntake || 0 : '12,482'}</Text>
              <Text style={styles.statLabel}>Daily Steps</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: Colors.secondary }]}>{analytics?.meta?.caloriesBurned ?? 842}</Text>
              <Text style={styles.statLabel}>Burned</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: Colors.tertiary }]}>{activeMinutes}</Text>
              <Text style={styles.statLabel}>Active Min</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Button style={styles.actionButton} onPress={() => router.push('/hydration')}>LOG WORKOUT</Button>
        <Button variant="secondary" style={styles.actionButton} onPress={() => router.push('/sleep')}>GOALS</Button>
      </View>

      <View style={styles.cardGridRow}>
        <PressableCard onPress={() => router.push('/hydration')} icon={<Droplets size={20} color={Colors.primary} />} title="Hydration" value="1.8L" progress={0.6} color={Colors.primary} />
        <PressableCard onPress={() => router.push('/sleep')} icon={<Moon size={20} color={Colors.secondary} />} title="Sleep" value="7h 24m" progress={0.85} color={Colors.secondary} />
      </View>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Trophy size={18} color={Colors.tertiary} />
          <Text style={styles.sectionTitle}>Daily Challenges</Text>
        </View>
        <Text onPress={() => router.push('/challenges')} style={styles.sectionAction}>View All</Text>
      </View>
      {challenges.map((item) => (
        <Card key={item.name} style={[styles.challengeCard, item.done && styles.challengeDone]}>
          <View style={[styles.challengeAccent, { backgroundColor: item.color }]} />
          <View style={styles.challengeBody}>
            <Text style={styles.challengeName}>{item.name}</Text>
            <Text style={styles.challengeSub}>{item.sub}</Text>
          </View>
          <View style={styles.challengeRight}>
            {item.done ? <View style={styles.donePill}><Text style={styles.doneText}>DONE</Text></View> : <Text style={styles.challengeXp}>{item.xp}</Text>}
          </View>
        </Card>
      ))}

      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Dumbbell size={18} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Today's Programs</Text>
        </View>
        <Text onPress={() => router.push('/workouts')} style={styles.sectionAction}>View All</Text>
      </View>
      <View style={styles.programGridRow}>
        {featuredWorkouts.map((workout) => (
          <PressableCard
            key={workout._id}
            onPress={() => router.push({ pathname: '/workout-detail/[id]', params: { id: workout._id } })}
            image={workout.thumbnail}
            title={workout.title}
            subtitle={`${workout.duration} min • ${workout.caloriesBurn} kcal`}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function PressableCard({
  onPress,
  icon,
  title,
  value,
  progress,
  color,
  image,
  subtitle,
}: {
  onPress: () => void;
  icon?: React.ReactNode;
  title: string;
  value?: string;
  progress?: number;
  color?: string;
  image?: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardPressable}> 
        <Card style={styles.smallCard}>
          {image ? (
            <Image source={{ uri: image }} style={styles.cardImage} />
          ) : (
            <View style={[styles.smallIconShell, { backgroundColor: `${color}20` }]}>{icon}</View>
          )}
          <View style={styles.cardTextBlock}>
            <Text style={styles.cardTitle}>{title}</Text>
            {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
            {value ? <Text style={styles.cardValue}>{value}</Text> : null}
            {typeof progress === 'number' ? <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: color }]} /></View> : null}
          </View>
          <ArrowRight size={18} color={Colors.onSurfaceVariant} />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  heroCard: {
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: Colors.surfaceLight,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 12, 20, 0.75)',
  },
  heroInner: {
    padding: 24,
    zIndex: 1,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  heroIconShell: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  heroAccent: {
    color: Colors.primary,
  },
  heroHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  heroDescription: {
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statColumn: {
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
  },
  cardGridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.onSurface,
    fontWeight: '800',
  },
  sectionAction: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 24,
  },
  challengeDone: {
    opacity: 0.75,
  },
  challengeAccent: {
    width: 6,
    height: 64,
    borderRadius: 999,
  },
  challengeBody: {
    flex: 1,
  },
  challengeName: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  challengeSub: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  challengeRight: {
    alignItems: 'flex-end',
  },
  challengeXp: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
  },
  donePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.tertiary,
  },
  doneText: {
    color: Colors.onSurface,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  programGridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardWrapper: {
    flex: 1,
  },
  cardPressable: {
    flex: 1,
  },
  smallCard: {
    padding: 16,
    justifyContent: 'space-between',
  },
  smallIconShell: {
    width: 46,
    height: 46,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextBlock: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardSubtitle: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 8,
  },
  cardValue: {
    color: Colors.onSurface,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: 6,
    borderRadius: 999,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    marginBottom: 16,
  },
});

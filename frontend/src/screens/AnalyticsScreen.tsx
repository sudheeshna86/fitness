import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Flame, TrendingUp, Users } from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { analyticsService } from '@/src/services/analyticsService';
import { AnalyticsData } from '@/src/types';
import { EngagementChart } from '@/src/components/charts/EngagementChart';
import { Colors } from '@/src/constants/theme';

export function AnalyticsScreen() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    analyticsService.getAnalytics().then(setAnalytics);
  }, []);

  if (!analytics) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading analytics…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>Platform Analytics</Text>
      </View>

      <View style={styles.statsRow}>
        <Card style={[styles.statCard, styles.statPrimary]}>
          <View style={styles.statIcon}><Users size={20} color={Colors.primary} /></View>
          <Text style={styles.statValue}>{analytics.totalUsers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
          <Text style={styles.statTrend}>+12%</Text>
        </Card>
        <Card style={[styles.statCard, styles.statSecondary]}>
          <View style={styles.statIcon}><TrendingUp size={20} color={Colors.secondary} /></View>
          <Text style={styles.statValue}>{analytics.activeUsers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Active Now</Text>
          <Text style={styles.statTrend}>+5.4%</Text>
        </Card>
      </View>

      <Card style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>User Engagement</Text>
          <TrendingUp size={20} color={Colors.tertiary} />
        </View>
        <Text style={styles.chartSubtitle}>Daily active sessions over 7 days</Text>
        <EngagementChart labels={analytics.weeklyEngagement.map((item) => item.name)} data={analytics.weeklyEngagement.map((item) => item.engagement)} />
      </Card>

      <Card style={styles.barCard}>
        <View style={styles.barHeadingRow}>
          <View style={styles.barHeadingLeft}><Flame size={16} color={Colors.secondary} /><Text style={styles.barHeadingTitle}>Popular Exercises</Text></View>
        </View>
        {analytics.topExercises.map((exercise) => (
          <View key={exercise.name} style={styles.exerciseRow}>
            <View style={[styles.exerciseIndicator, { backgroundColor: exercise.color }]} />
            <View style={styles.exerciseBody}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseMeta}>{exercise.count} reps</Text>
            </View>
            <View style={styles.exerciseProgressTrack}><View style={[styles.exerciseProgressFill, { width: `${(exercise.count / 1200) * 100}%`, backgroundColor: exercise.color }]} /></View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.onSurface,
    fontSize: 16,
  },
  content: {
    padding: 24,
    paddingBottom: 120,
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 18,
  },
  statPrimary: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  statSecondary: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statValue: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
  },
  statLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  statTrend: {
    color: Colors.tertiary,
    fontSize: 12,
    marginTop: 10,
    fontWeight: '700',
  },
  chartCard: {
    padding: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '900',
  },
  chartSubtitle: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 16,
  },
  barCard: {
    padding: 20,
  },
  barHeadingRow: {
    marginBottom: 16,
  },
  barHeadingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barHeadingTitle: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '900',
  },
  exerciseRow: {
    gap: 16,
    marginBottom: 18,
  },
  exerciseIndicator: {
    width: 6,
    borderRadius: 999,
  },
  exerciseBody: {
    flex: 1,
    gap: 4,
  },
  exerciseName: {
    color: Colors.onSurface,
    fontSize: 14,
    fontWeight: '900',
  },
  exerciseMeta: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  exerciseProgressTrack: {
    width: 80,
    height: 10,
    borderRadius: 999,
    backgroundColor: Colors.surfaceLight,
    overflow: 'hidden',
  },
  exerciseProgressFill: {
    height: '100%',
    borderRadius: 999,
  },
});

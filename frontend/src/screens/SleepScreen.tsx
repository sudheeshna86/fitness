import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Bell, ChevronRight, Info, Moon, Wind } from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { ProgressRing } from '@/src/components/ui/ProgressRing';
import { Colors } from '@/src/constants/theme';

const weeklyLevels = [50, 70, 90, 45, 65, 85, 75];
const stages = [
  { label: 'Deep Sleep', pct: '25%', color: Colors.primary },
  { label: 'Light Sleep', pct: '45%', color: Colors.secondary },
  { label: 'REM', pct: '20%', color: Colors.tertiary },
  { label: 'Awake', pct: '10%', color: Colors.surfaceLight },
];

export function SleepScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color={Colors.onSurface} />
      </TouchableOpacity>
      <Text style={styles.sectionLabel}>TONIGHT'S ANALYSIS</Text>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Excellent – 8h 20m</Text>
        <Wind size={24} color={Colors.primary} />
      </View>
      <View style={styles.centeredBlock}>
        <ProgressRing progress={94} label="94" subLabel="SLEEP SCORE" />
        <View style={styles.metricRow}>
          <Card style={styles.metricCard}><Text style={styles.metricLabel}>DEEP SLEEP</Text><Text style={styles.metricValue}>2h 15m</Text></Card>
          <Card style={styles.metricCard}><Text style={styles.metricLabel}>REM</Text><Text style={styles.metricValue}>1h 45m</Text></Card>
        </View>
      </View>
      <Text style={styles.heading}>Weekly Trend</Text>
      <Text style={styles.subheading}>AVG: 7H 45M</Text>
      <Card style={styles.barChartCard}>
        <View style={styles.weeklyRow}>
          {weeklyLevels.map((value, index) => (
            <View key={index} style={styles.barGroup}>
              <View style={styles.barTrack}><View style={[styles.barFill, { height: `${value}%`, backgroundColor: index === 2 ? Colors.primary : Colors.secondary }]} /></View>
              <Text style={styles.barLabel}>{'MTWTFSS'[index]}</Text>
            </View>
          ))}
        </View>
      </Card>
      <Text style={styles.heading}>Sleep Stages</Text>
      <View style={styles.stageTrack}>
        <View style={[styles.stageSegment, { width: '25%', backgroundColor: Colors.primary }]} />
        <View style={[styles.stageSegment, { width: '45%', backgroundColor: Colors.secondary }]} />
        <View style={[styles.stageSegment, { width: '20%', backgroundColor: Colors.tertiary }]} />
        <View style={[styles.stageSegment, { width: '10%', backgroundColor: Colors.surfaceLight }]} />
      </View>
      <View style={styles.stageList}>
        {stages.map((stage) => (
          <View key={stage.label} style={styles.stageRow}>
            <View style={[styles.stageDot, { backgroundColor: stage.color }]} />
            <Text style={styles.stageLabel}>{stage.label}</Text>
            <Text style={styles.stagePct}>{stage.pct}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.heading}>Sleep Routine</Text>
      <Card style={styles.routineCard}>
        <View style={styles.routineRow}>
          <View style={styles.routineLeft}><Moon size={20} color={Colors.onSurfaceVariant} /></View>
          <View style={styles.routineDetails}>
            <Text style={styles.routineTitle}>Wind Down</Text>
            <Text style={styles.routineSub}>Starts at 10:00 PM</Text>
          </View>
          <View style={styles.toggleTrack}><View style={styles.toggleKnob} /></View>
        </View>
      </Card>
      <Card style={styles.routineCard}>
        <View style={styles.routineRow}>
          <View style={styles.routineLeft}><Bell size={20} color={Colors.onSurfaceVariant} /></View>
          <View style={styles.routineDetails}>
            <Text style={styles.routineTitle}>Bedtime Reminder</Text>
            <Text style={styles.routineSub}>Daily at 10:30 PM</Text>
          </View>
          <ChevronRight size={18} color={Colors.onSurfaceVariant} />
        </View>
      </Card>
      <Card style={styles.noteCard}>
        <View style={styles.noteHeader}><Info size={24} color={Colors.primary} /><Text style={styles.noteTitle}>Recovery Boost</Text></View>
        <Text style={styles.noteText}>Your Deep Sleep is 15% higher than average today. This is excellent for muscle recovery after yesterday's intense workout.</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 120,
    gap: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: Colors.onSurface,
    fontSize: 30,
    fontWeight: '900',
    flex: 1,
  },
  centeredBlock: {
    alignItems: 'center',
    gap: 18,
  },
  metricRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 18,
    alignItems: 'flex-start',
  },
  metricLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  metricValue: {
    color: Colors.onSurface,
    fontSize: 22,
    fontWeight: '900',
  },
  heading: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '900',
  },
  subheading: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 8,
  },
  barChartCard: {
    padding: 22,
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
  },
  barGroup: {
    alignItems: 'center',
    gap: 8,
    width: 24,
  },
  barTrack: {
    width: 24,
    height: 140,
    borderRadius: 999,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 999,
  },
  barLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  stageTrack: {
    flexDirection: 'row',
    height: 14,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 18,
  },
  stageSegment: {
    height: '100%',
  },
  stageList: {
    gap: 12,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stageDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  stageLabel: {
    color: Colors.onSurface,
    fontSize: 14,
    flex: 1,
  },
  stagePct: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
  },
  routineCard: {
    padding: 18,
  },
  routineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  routineLeft: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineDetails: {
    flex: 1,
  },
  routineTitle: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '900',
  },
  routineSub: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  toggleTrack: {
    width: 48,
    height: 24,
    borderRadius: 999,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    padding: 4,
  },
  toggleKnob: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
  },
  noteCard: {
    padding: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  noteTitle: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '900',
  },
  noteText: {
    color: Colors.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 20,
  },
});

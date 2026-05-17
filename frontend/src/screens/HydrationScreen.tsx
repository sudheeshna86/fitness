import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Droplets, Lightbulb, Minus, Plus, Trash2 } from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { ProgressRing } from '@/src/components/ui/ProgressRing';
import { Button } from '@/src/components/ui/Button';
import { Colors } from '@/src/constants/theme';

const hydrationEntries = [
  { amount: '500ml', time: '12:30 PM' },
  { amount: '250ml', time: '10:00 AM' },
  { amount: '750ml', time: '08:15 AM' },
];

const weekLevels = [60, 80, 100, 40, 70, 55, 30];

export function HydrationScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color={Colors.onSurface} />
      </TouchableOpacity>
      <Text style={styles.sectionLabel}>HYDRATION</Text>
      <Text style={styles.title}>Daily Goal</Text>

      <View style={styles.centeredBlock}>
        <ProgressRing progress={50} label="1.5L" subLabel="GOAL: 3.0L" />
        <View style={styles.hydrationActions}>
          <TouchableOpacity style={styles.circleButton}><Minus size={24} color={Colors.onSurface} /></TouchableOpacity>
          <View style={styles.hydrationStatus}><Text style={styles.hydrationStatusText}><Text style={{ color: Colors.primary }}>50%</Text> Done</Text></View>
          <TouchableOpacity style={[styles.circleButton, styles.addButton]}><Plus size={24} color={Colors.onSurface} /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.quickButtonsRow}>
        {['250ML', '500ML', '750ML'].map((item) => (
          <TouchableOpacity key={item} style={styles.quickButton}><Text style={styles.quickButtonText}>{item}</Text></TouchableOpacity>
        ))}
      </View>

      <Card style={styles.tipCard}>
        <View style={styles.tipIcon}><Lightbulb size={24} color={Colors.primary} /></View>
        <View style={styles.tipBody}>
          <Text style={styles.tipTitle}>Hydration Tip</Text>
          <Text style={styles.tipText}>Drinking water right after waking up helps jumpstart your metabolism and clears out toxins.</Text>
        </View>
      </Card>

      <Text style={styles.heading}>History</Text>
      {hydrationEntries.map((entry) => (
        <Card key={entry.time} style={styles.historyCard}>
          <View style={styles.historyLeft}>
            <View style={styles.historyBadge}><Droplets size={18} color={Colors.primary} /></View>
            <View>
              <Text style={styles.historyAmount}>{entry.amount}</Text>
              <Text style={styles.historyTime}>{entry.time}</Text>
            </View>
          </View>
          <TouchableOpacity><Trash2 size={18} color={Colors.error} /></TouchableOpacity>
        </Card>
      ))}

      <Text style={styles.heading}>Weekly Consistency</Text>
      <Card style={styles.barCard}>
        <View style={styles.barRow}>
          {weekLevels.map((level, index) => (
            <View key={index} style={styles.barGroup}>
              <View style={styles.barTrack}><View style={[styles.barFill, { height: `${level}%`, backgroundColor: index === 2 ? Colors.energy : Colors.secondary }]} /></View>
              <Text style={styles.barLabel}>{'MTWTFSS'[index]}</Text>
            </View>
          ))}
        </View>
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
  title: {
    color: Colors.onSurface,
    fontSize: 30,
    fontWeight: '900',
  },
  centeredBlock: {
    alignItems: 'center',
    gap: 18,
  },
  hydrationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 18,
  },
  circleButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderColor: 'transparent',
  },
  hydrationStatus: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: Colors.surfaceLight,
  },
  hydrationStatusText: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
  },
  quickButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: Colors.card,
    alignItems: 'center',
  },
  quickButtonText: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tipCard: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  tipIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipBody: {
    flex: 1,
  },
  tipTitle: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  tipText: {
    color: Colors.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 20,
  },
  heading: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '900',
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyBadge: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyAmount: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '900',
  },
  historyTime: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  barCard: {
    padding: 22,
  },
  barRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
  },
  barGroup: {
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    width: 16,
    height: 140,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 999,
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
    fontWeight: '700',
  },
});

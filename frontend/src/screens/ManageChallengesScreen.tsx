import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Copy, Edit2, Plus, Trash2, Timer, TrendingUp, Users } from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { challengeService } from '@/src/services/challengeService';
import { Challenge } from '@/src/types';
import { Colors } from '@/src/constants/theme';

export function ManageChallengesScreen() {
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    challengeService.getChallenges().then(setChallenges);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color={Colors.onSurface} />
      </TouchableOpacity>
      <View style={styles.badgeRow}>
        <Text style={styles.badgeText}>ADMIN PORTAL</Text>
      </View>
      <View style={styles.metricGrid}>
        {['TOTAL LIVE', 'ENGAGEMENT', 'ACTIVE USERS', 'AVG COMPLETION'].map((label, index) => (
          <Card key={label} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{label}</Text>
            <Text style={styles.metricValue}>{['12', '84%', '24.5k', '62%'][index]}</Text>
          </Card>
        ))}
      </View>
      <Text style={styles.heading}>Manage Challenges</Text>
      {challenges.map((challenge) => (
        <Card key={challenge.id} style={styles.challengeCard}>
          {challenge.image ? <Image source={{ uri: challenge.image }} style={styles.challengeImage} /> : null}
          <View style={styles.statusRow}>
            <View style={[styles.statusPill, challenge.status === 'Live' ? styles.statusLive : challenge.status === 'Draft' ? styles.statusDraft : styles.statusEnded]}>
              <Text style={styles.statusPillText}>{challenge.status}</Text>
            </View>
          </View>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          <View style={styles.challengeRow}>
            <View style={styles.detailChip}><Users size={14} color={Colors.onSurface} /><Text style={styles.detailText}>{Math.round(challenge.participants / 1000)}k Participants</Text></View>
            <View style={styles.detailChip}><Timer size={14} color={Colors.tertiary} /><Text style={[styles.detailText, { color: Colors.tertiary }]}>Ends in {challenge.endsInDays}d</Text></View>
          </View>
          <View style={styles.challengeActions}>
            <TouchableOpacity style={styles.iconButton}><Edit2 size={20} color={Colors.onSurfaceVariant} /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Copy size={20} color={Colors.onSurfaceVariant} /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Trash2 size={20} color={Colors.error} /></TouchableOpacity>
          </View>
        </Card>
      ))}
      <TouchableOpacity style={styles.floatingButton} onPress={() => {}}>
        <Plus size={32} color={Colors.onSurface} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 160,
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
  badgeRow: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    borderRadius: 16,
  },
  badgeText: {
    color: Colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  metricCard: {
    flexBasis: '48%',
    padding: 18,
  },
  metricLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  metricValue: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
  },
  heading: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
  },
  challengeCard: {
    padding: 0,
    overflow: 'hidden',
  },
  challengeImage: {
    width: '100%',
    height: 180,
  },
  statusRow: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  statusPillText: {
    color: Colors.onSurface,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  statusLive: {
    backgroundColor: 'rgba(167, 139, 250, 0.2)',
  },
  statusDraft: {
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
  },
  statusEnded: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  challengeTitle: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '900',
    margin: 18,
    marginBottom: 4,
  },
  challengeDescription: {
    color: Colors.onSurfaceVariant,
    fontSize: 13,
    marginHorizontal: 18,
    marginBottom: 18,
    lineHeight: 20,
  },
  challengeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginHorizontal: 18,
    marginBottom: 18,
  },
  detailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  challengeActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    ...Platform.select({
      web: {
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
      },
      default: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
      },
    }),
  },
});

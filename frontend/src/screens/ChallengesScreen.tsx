import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Flame, Trophy, Users } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { fetchChallenges, joinChallenge, completeChallenge } from '@/src/services/api/challenges';
import { Challenge } from '@/src/types';
import { Colors } from '@/src/constants/theme';

export function ChallengesScreen() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const loadChallenges = async () => {
    const response = await fetchChallenges();
    setChallenges(response);
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const handleJoin = async (id: string) => {
    try {
      await joinChallenge(id);
      Alert.alert('Joined', 'You have joined the challenge successfully.');
      loadChallenges();
    } catch (error: any) {
      Alert.alert('Join failed', error?.message || 'Unable to join challenge.');
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await completeChallenge(id);
      Alert.alert('Completed', 'Challenge marked as completed.');
      loadChallenges();
    } catch (error: any) {
      Alert.alert('Completion failed', error?.message || 'Unable to complete challenge.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Challenges</Text>
      <Text style={styles.subheading}>Discover premium programs and active competitions.</Text>

      <View style={styles.gridRow}>
        <Card style={styles.statCard}>
          <Users size={20} color={Colors.primary} />
          <Text style={styles.statValue}>{challenges.reduce((total, challenge) => total + challenge.participants, 0).toLocaleString()}</Text>
          <Text style={styles.statLabel}>Participants</Text>
        </Card>
        <Card style={styles.statCard}>
          <Flame size={20} color={Colors.secondary} />
          <Text style={styles.statValue}>{challenges.length ? `${Math.round((challenges.filter((item) => item.status === 'Live').length / challenges.length) * 100)}%` : '0%'}</Text>
          <Text style={styles.statLabel}>Live Challenges</Text>
        </Card>
      </View>

      {challenges.map((challenge) => (
        <Card key={challenge.id} style={styles.challengeCard}>
          <Text style={styles.challengeStatus}>{challenge.status.toUpperCase()}</Text>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          <View style={styles.footerRow}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Participants</Text>
              <Text style={styles.detailValue}>{challenge.participants.toLocaleString()}</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Ends In</Text>
              <Text style={styles.detailValue}>{challenge.endsInDays} days</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%`, backgroundColor: challenge.status === 'Live' ? Colors.primary : Colors.secondary }]} />
          </View>
          <View style={styles.actionRow}>
            <Button style={styles.actionButton} onPress={() => handleJoin(challenge.id)}>
              Join
            </Button>
            <Button variant="secondary" style={styles.actionButton} onPress={() => handleComplete(challenge.id)}>
              Complete
            </Button>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 120,
    gap: 18,
  },
  heading: {
    color: Colors.onSurface,
    fontSize: 26,
    fontWeight: '900',
  },
  subheading: {
    color: Colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    padding: 18,
    alignItems: 'flex-start',
  },
  statValue: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 12,
  },
  statLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    marginTop: 6,
    textTransform: 'uppercase',
  },
  challengeCard: {
    padding: 20,
    gap: 14,
  },
  challengeStatus: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  challengeTitle: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '900',
  },
  challengeDescription: {
    color: Colors.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  detailColumn: {
    gap: 4,
  },
  detailLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  detailValue: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '800',
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
});

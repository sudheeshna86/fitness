import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, CalendarDays, Clock, Flame, Flag, DollarSign, Trophy } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { createChallenge } from '@/src/services/api/challenges';
import { Colors } from '@/src/constants/theme';

const challengeTypes = ['Global Challenge', 'Program Launch', 'Community Event'];
const statusOptions = ['Live', 'Draft', 'Pending'];

export function NewChallengeScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [type, setType] = useState(challengeTypes[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [participants, setParticipants] = useState('2500');
  const [duration, setDuration] = useState('30');
  const [description, setDescription] = useState('Describe the challenge, goals, and the expected athlete experience.');

  const handleCreate = async () => {
    try {
      await createChallenge({
        title,
        description,
        reward: description,
        status,
        endsInDays: Number(duration),
      });
      Alert.alert('Created', 'Challenge created successfully.');
      router.back();
    } catch (error: any) {
      Alert.alert('Create failed', error?.message || 'Unable to create challenge.');
    }
  };

  const handleSaveDraft = async () => {
    try {
      await createChallenge({
        title,
        description,
        reward: description,
        status: 'Draft',
        endsInDays: Number(duration),
      });
      Alert.alert('Saved', 'Challenge draft saved successfully.');
      router.back();
    } catch (error: any) {
      Alert.alert('Save failed', error?.message || 'Unable to save draft.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color={Colors.onSurface} />
      </TouchableOpacity>

      <Text style={styles.title}>Create New Challenge</Text>
      <Text style={styles.subtitle}>Launch a premium challenge to drive retention and community engagement.</Text>

      <Card style={styles.sectionCard}>
        <Text style={styles.fieldLabel}>Cover Image</Text>
        <View style={styles.uploadBox}>
          <Flag size={32} color={Colors.onSurfaceVariant} />
          <Text style={styles.uploadTitle}>Add a cover image</Text>
          <Text style={styles.uploadSubtitle}>JPG, PNG, or WEBP (Max 20MB)</Text>
        </View>
      </Card>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Challenge Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 30-Day Transformation"
          placeholderTextColor={Colors.onSurfaceVariant}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Challenge Type</Text>
        <View style={styles.optionRow}>
          {challengeTypes.map((option) => (
            <Button
              key={option}
              variant={option === type ? 'primary' : 'secondary'}
              style={styles.optionButton}
              onPress={() => setType(option)}
            >
              {option}
            </Button>
          ))}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Status</Text>
        <View style={styles.optionRow}>
          {statusOptions.map((option) => (
            <Button
              key={option}
              variant={option === status ? 'primary' : 'secondary'}
              style={styles.optionButton}
              onPress={() => setStatus(option)}
            >
              {option}
            </Button>
          ))}
        </View>
      </View>

      <View style={styles.gridRow}>
        <View style={styles.gridField}>
          <Text style={styles.fieldLabel}>Participants</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="2500"
              placeholderTextColor={Colors.onSurfaceVariant}
              keyboardType="numeric"
              value={participants}
              onChangeText={setParticipants}
            />
            <Users size={18} color={Colors.onSurfaceVariant} />
          </View>
        </View>
        <View style={styles.gridField}>
          <Text style={styles.fieldLabel}>Duration (Days)</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="30"
              placeholderTextColor={Colors.onSurfaceVariant}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
            <CalendarDays size={18} color={Colors.onSurfaceVariant} />
          </View>
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Challenge Rewards</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.input}
            placeholder="e.g., $5,000 cash prize + premium access"
            placeholderTextColor={Colors.onSurfaceVariant}
            value={description}
            onChangeText={setDescription}
          />
          <DollarSign size={18} color={Colors.onSurfaceVariant} />
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Button style={styles.publishButton} onPress={handleCreate}>
        CREATE CHALLENGE
      </Button>
      <TouchableOpacity style={styles.draftButton} onPress={handleSaveDraft}>
        <Text style={styles.draftButtonText}>SAVE AS DRAFT</Text>
      </TouchableOpacity>
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
  title: {
    color: Colors.onSurface,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: Colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 22,
  },
  sectionCard: {
    padding: 22,
  },
  fieldLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 24,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 10,
  },
  uploadTitle: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '800',
  },
  uploadSubtitle: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 220,
  },
  fieldGroup: {
    gap: 10,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    color: Colors.onSurface,
    padding: 16,
    fontSize: 14,
    flex: 1,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridField: {
    flex: 1,
    gap: 10,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textArea: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
  publishButton: {
    marginTop: 4,
    paddingVertical: 18,
  },
  draftButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  draftButtonText: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});

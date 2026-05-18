import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ArrowLeft, CalendarDays, Clock, Flame, Flag, DollarSign, Trophy, Users, Upload } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { createChallenge } from '@/src/services/api/challenges';
import { uploadMedia } from '@/src/services/api/upload';
import { Colors } from '@/src/constants/theme';

const challengeTypes = ['Global Challenge', 'Program Launch', 'Community Event'];
const statusOptions = ['Live', 'Draft', 'Pending'];

type MediaFile = {
  uri: string;
  type: string;
  name: string;
};

const getMimeType = (uri: string, assetType: 'image' | 'video' | string) => {
  const ext = uri.split('.').pop()?.toLowerCase();
  if (assetType === 'video') {
    if (ext === 'mov') return 'video/quicktime';
    if (ext === 'mp4') return 'video/mp4';
    return `video/${ext || 'mp4'}`;
  }
  if (ext === 'png') return 'image/png';
  return 'image/jpeg';
};

export function NewChallengeScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [type, setType] = useState(challengeTypes[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [participants, setParticipants] = useState('2500');
  const [duration, setDuration] = useState('30');
  const [description, setDescription] = useState('Describe the challenge, goals, and the expected athlete experience.');
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickMedia = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your media library to upload a challenge cover image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    const assetType = asset.type || 'image';
    const mimeType = getMimeType(asset.uri, assetType);
    const name = asset.fileName || `challenge-image-${Date.now()}.${mimeType.split('/')[1]}`;

    setMedia({ uri: asset.uri, type: mimeType, name });
  };

  const uploadSelectedMedia = async () => {
    if (!media) return '';
    setUploading(true);
    try {
      const result = await uploadMedia(media);
      return result.url || result.secure_url || '';
    } catch (error: any) {
      Alert.alert('Upload failed', error?.message || 'Unable to upload challenge image.');
      return '';
    } finally {
      setUploading(false);
    }
  };

  const validateFields = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a challenge title.');
      return false;
    }
    if (!description.trim() || description === 'Describe the challenge, goals, and the expected athlete experience.') {
      Alert.alert('Validation', 'Please enter a challenge description.');
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateFields()) return;
    try {
      let imageUrl = '';
      if (media) {
        imageUrl = await uploadSelectedMedia();
      }
      await createChallenge({
        title,
        description,
        reward: description,
        status,
        endsInDays: Number(duration),
        imageUrl: imageUrl || undefined,
      });
      Alert.alert('Created', 'Challenge created successfully.');
      router.back();
    } catch (error: any) {
      Alert.alert('Create failed', error?.message || 'Unable to create challenge.');
    }
  };

  const handleSaveDraft = async () => {
    if (!validateFields()) return;
    try {
      let imageUrl = '';
      if (media) {
        imageUrl = await uploadSelectedMedia();
      }
      await createChallenge({
        title,
        description,
        reward: description,
        status: 'Draft',
        endsInDays: Number(duration),
        imageUrl: imageUrl || undefined,
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
        <TouchableOpacity onPress={pickMedia} disabled={uploading}>
          {media ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: media.uri }} style={styles.imagePreview} />
              {uploading && (
                <View style={styles.uploadingOverlay}>
                  <ActivityIndicator size="large" color={Colors.primary} />
                  <Text style={styles.uploadingText}>Uploading...</Text>
                </View>
              )}
              {!uploading && (
                <TouchableOpacity style={styles.changeImageButton} onPress={pickMedia}>
                  <Upload size={16} color={Colors.onPrimary} />
                  <Text style={styles.changeImageButtonText}>Change Image</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.uploadBox}>
              <Flag size={32} color={Colors.onSurfaceVariant} />
              <Text style={styles.uploadTitle}>Add a cover image</Text>
              <Text style={styles.uploadSubtitle}>JPG, PNG, or WEBP (Max 20MB)</Text>
            </View>
          )}
        </TouchableOpacity>
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
  imagePreviewContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 24,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  uploadingText: {
    color: Colors.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  changeImageButtonText: {
    color: Colors.onPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});

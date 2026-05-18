import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ArrowLeft, Clock, Flame, Info, Upload } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { createWorkout } from '@/src/services/api/workouts';
import { uploadMedia } from '@/src/services/api/upload';
import { Colors } from '@/src/constants/theme';

const difficultyLevels = ['Elite', 'Pro', 'Basic'];
const categories = ['Strength Training', 'HIIT', 'Yoga & Flow', 'Mobility'];

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

export function AddWorkoutScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [difficulty, setDifficulty] = useState('Pro');
  const [duration, setDuration] = useState('45');
  const [calories, setCalories] = useState('600');
  const [notes, setNotes] = useState('');
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickMedia = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your media library to upload a workout cover image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
    const name = asset.fileName || `workout-media-${Date.now()}.${mimeType.split('/')[1]}`;

    setMedia({ uri: asset.uri, type: mimeType, name });
  };

  const uploadSelectedMedia = async () => {
    if (!media) return '';
    setUploading(true);
    try {
      const result = await uploadMedia(media);
      return result.url || result.secure_url || '';
    } catch (error: any) {
      Alert.alert('Upload failed', error?.message || 'Unable to upload workout media.');
      return '';
    } finally {
      setUploading(false);
    }
  };

  const validateFields = () => {
    if (!title.trim()) {
      Alert.alert('Missing title', 'Please provide a workout title.');
      return false;
    }
    if (!duration.trim() || Number(duration) <= 0) {
      Alert.alert('Invalid duration', 'Please enter a valid duration in minutes.');
      return false;
    }
    if (!calories.trim() || Number(calories) <= 0) {
      Alert.alert('Invalid calories', 'Please enter a valid calories estimate.');
      return false;
    }
    return true;
  };

  const handleSave = async (status: 'published' | 'draft') => {
    if (!validateFields()) {
      return;
    }

    let thumbnail = '';
    if (media) {
      thumbnail = await uploadSelectedMedia();
      if (!thumbnail) {
        return;
      }
    }

    try {
      await createWorkout({
        title: title.trim(),
        description: notes.trim(),
        category,
        duration: Number(duration),
        caloriesBurn: Number(calories),
        difficulty,
        exercises: [],
        thumbnail,
        status,
      });
      Alert.alert(status === 'published' ? 'Workout Published' : 'Saved as Draft', 'The workout has been saved successfully.');
      router.back();
    } catch (error: any) {
      Alert.alert('Save failed', error?.message || 'Unable to save workout.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color={Colors.onSurface} />
      </TouchableOpacity>
      <Text style={styles.title}>Add New Workout</Text>
      <Text style={styles.subtitle}>Configure high-performance training protocols for elite athletes.</Text>
      <View style={styles.progressDotRow}>
        <View style={styles.progressDotActive} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      <Card style={styles.sectionCard}>
        <Text style={styles.fieldLabel}>Cover Media</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickMedia} activeOpacity={0.8}>
          {media ? (
            <Image source={{ uri: media.uri }} style={styles.mediaPreview} resizeMode="cover" />
          ) : (
            <>
              <Upload size={32} color={Colors.onSurfaceVariant} />
              <Text style={styles.uploadTitle}>Tap to choose media</Text>
              <Text style={styles.uploadSubtitle}>Supports MP4, MOV, JPG (Max 50MB)</Text>
            </>
          )}
        </TouchableOpacity>
        {uploading && (
          <View style={styles.uploadingRow}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={styles.uploadingText}>Uploading media...</Text>
          </View>
        )}
      </Card>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Workout Title</Text>
        <TextInput style={styles.input} placeholder="e.g., Hypertrophy Max Focus" placeholderTextColor={Colors.onSurfaceVariant} value={title} onChangeText={setTitle} />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Category</Text>
        <View style={styles.categoryRow}>
          {categories.map((item) => (
            <Button
              key={item}
              variant={item === category ? 'primary' : 'secondary'}
              style={styles.categoryButton}
              onPress={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Difficulty Level</Text>
        <View style={styles.difficultyRow}>
          {difficultyLevels.map((level) => (
            <Button
              key={level}
              variant={level === difficulty ? 'primary' : 'secondary'}
              style={styles.levelButton}
              onPress={() => setDifficulty(level)}
            >
              {level.toUpperCase()}
            </Button>
          ))}
        </View>
      </View>

      <View style={styles.gridRow}>
        <View style={styles.gridField}>
          <Text style={styles.fieldLabel}>Duration (Min)</Text>
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input} placeholder="45" placeholderTextColor={Colors.onSurfaceVariant} keyboardType="numeric" value={duration} onChangeText={setDuration} />
            <Clock size={18} color={Colors.onSurfaceVariant} />
          </View>
        </View>
        <View style={styles.gridField}>
          <Text style={styles.fieldLabel}>Est. Calories</Text>
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input} placeholder="600" placeholderTextColor={Colors.onSurfaceVariant} keyboardType="numeric" value={calories} onChangeText={setCalories} />
            <Flame size={18} color={Colors.onSurfaceVariant} />
          </View>
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Detailed Briefing</Text>
        <View style={styles.textAreaWrapper}>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the focus areas and performance goals..."
            placeholderTextColor={Colors.onSurfaceVariant}
            multiline
            numberOfLines={6}
            value={notes}
            onChangeText={setNotes}
          />
          <Info style={styles.infoIcon} size={20} color={Colors.onSurfaceVariant} />
        </View>
      </View>

      <Button style={styles.publishButton} onPress={() => handleSave('published')}>
        PUBLISH WORKOUT
      </Button>
      <TouchableOpacity style={styles.draftButton} onPress={() => handleSave('draft')}>
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
  progressDotRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  progressDot: {
    width: 30,
    height: 6,
    borderRadius: 999,
    backgroundColor: Colors.surfaceLight,
  },
  progressDotActive: {
    width: 70,
    height: 6,
    borderRadius: 999,
    backgroundColor: Colors.primary,
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
    overflow: 'hidden',
  },
  mediaPreview: {
    width: '100%',
    height: 180,
    borderRadius: 18,
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
  uploadingRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  uploadingText: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
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
  selectField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  selectText: {
    color: Colors.onSurface,
    fontSize: 14,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  levelButton: {
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
  textAreaWrapper: {
    position: 'relative',
  },
  textArea: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
  infoIcon: {
    position: 'absolute',
    top: 18,
    right: 18,
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

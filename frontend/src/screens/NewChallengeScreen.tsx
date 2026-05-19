import { useRouter } from 'expo-router';

import React, {
  useState,
} from 'react';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  ArrowLeft,
  Upload,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

import { Button } from '@/src/components/ui/Button';

import { createChallenge } from '@/src/services/api/challenges';

import { uploadMedia } from '@/src/services/api/upload';

const categories = [
  'Workout',
  'Water',
  'Sleep',
  'Weight Loss',
  'Strength',
];

const difficulties = [
  'Easy',
  'Medium',
  'Hard',
];

export function NewChallengeScreen() {
  const router = useRouter();

  const [title, setTitle] =
    useState('');

  const [
    description,
    setDescription,
  ] = useState('');

  const [reward, setReward] =
    useState('');

  const [duration, setDuration] =
    useState('30');

  const [xpReward, setXpReward] =
    useState('250');

  const [category, setCategory] =
    useState('Workout');

  const [
    difficulty,
    setDifficulty,
  ] = useState('Easy');

  const [image, setImage] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,
          quality: 0.7,
        }
      );

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleCreate =
    async () => {
      try {
        setLoading(true);

        let imageUrl = '';

        if (image) {
          const uploaded =
            await uploadMedia({
              uri: image.uri,
              type: 'image/jpeg',
              name: 'challenge.jpg',
            });

          imageUrl =
            uploaded.url ||
            uploaded.secure_url;
        }

        await createChallenge({
          title,
          description,
          reward,
          duration:
            Number(duration),
          xpReward:
            Number(xpReward),
          category,
          difficulty,
          imageUrl,
          status: 'Live',
        });

        Alert.alert(
          'Success',
          'Challenge created successfully'
        );

        router.back();
      } catch (error: any) {
        Alert.alert(
          'Error',
          error?.message ||
            'Unable to create challenge'
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() =>
          router.back()
        }
      >
        <ArrowLeft
          size={20}
          color={
            Colors.onSurface
          }
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Create Challenge
      </Text>

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{
              uri: image.uri,
            }}
            style={styles.preview}
          />
        ) : (
          <>
            <Upload
              size={34}
              color={
                Colors.onSurfaceVariant
              }
            />

            <Text
              style={
                styles.imageText
              }
            >
              Upload Cover Image
            </Text>
          </>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Challenge Title"
        placeholderTextColor={
          Colors.onSurfaceVariant
        }
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
        placeholder="Challenge Description"
        placeholderTextColor={
          Colors.onSurfaceVariant
        }
        multiline
        value={description}
        onChangeText={
          setDescription
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Reward"
        placeholderTextColor={
          Colors.onSurfaceVariant
        }
        value={reward}
        onChangeText={setReward}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration"
        keyboardType="numeric"
        placeholderTextColor={
          Colors.onSurfaceVariant
        }
        value={duration}
        onChangeText={
          setDuration
        }
      />

      <TextInput
        style={styles.input}
        placeholder="XP Reward"
        keyboardType="numeric"
        placeholderTextColor={
          Colors.onSurfaceVariant
        }
        value={xpReward}
        onChangeText={
          setXpReward
        }
      />

      <Text style={styles.label}>
        Category
      </Text>

      <View style={styles.row}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.chip,

              category === item &&
                styles.activeChip,
            ]}
            onPress={() =>
              setCategory(item)
            }
          >
            <Text
              style={[
                styles.chipText,

                category === item &&
                  styles.activeChipText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>
        Difficulty
      </Text>

      <View style={styles.row}>
        {difficulties.map(
          (item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,

                difficulty ===
                  item &&
                  styles.activeChip,
              ]}
              onPress={() =>
                setDifficulty(
                  item
                )
              }
            >
              <Text
                style={[
                  styles.chipText,

                  difficulty ===
                    item &&
                    styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <Button
        style={styles.createBtn}
        onPress={
          handleCreate
        }
      >
        {loading
          ? 'Creating...'
          : 'Create Challenge'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  backBtn: {
    width: 46,
    height: 46,
    borderRadius: 18,

    backgroundColor:
      Colors.card,

    alignItems: 'center',
    justifyContent:
      'center',

    marginBottom: 24,
  },

  title: {
    color: Colors.onSurface,
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 24,
  },

  imagePicker: {
    height: 220,

    backgroundColor:
      Colors.card,

    borderRadius: 28,

    alignItems: 'center',
    justifyContent:
      'center',

    marginBottom: 24,
    overflow: 'hidden',
  },

  preview: {
    width: '100%',
    height: '100%',
  },

  imageText: {
    color:
      Colors.onSurfaceVariant,
    marginTop: 14,
  },

  input: {
    backgroundColor:
      Colors.card,

    borderRadius: 22,

    paddingHorizontal: 18,
    paddingVertical: 18,

    color: Colors.onSurface,

    marginBottom: 18,
  },

  textArea: {
    minHeight: 140,
    textAlignVertical: 'top',
  },

  label: {
    color: Colors.onSurface,
    fontWeight: '800',
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,

    borderRadius: 999,

    backgroundColor:
      Colors.card,
  },

  activeChip: {
    backgroundColor:
      Colors.primary,
  },

  chipText: {
    color:
      Colors.onSurfaceVariant,
    fontWeight: '700',
  },

  activeChipText: {
    color: '#FFFFFF',
  },

  createBtn: {
    borderRadius: 22,
    paddingVertical: 18,
  },
});
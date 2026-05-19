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
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {
  Camera,
  Dumbbell,
} from 'lucide-react-native';

import { Colors } from '@/src/constants/theme';

import { Button } from '@/src/components/ui/Button';

import {
  createExercise,
} from '@/src/services/api/exercises';

import {
  uploadMedia,
} from '@/src/services/api/upload';

export function AddExerciseScreen() {
  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState('');

  const [
    description,
    setDescription,
  ] = useState('');

  const [duration, setDuration] =
    useState('');

  const [restTime, setRestTime] =
    useState('');

  const [
    targetMuscle,
    setTargetMuscle,
  ] = useState('');

  const [
    caloriesBurn,
    setCaloriesBurn,
  ] = useState('');

  const [difficulty, setDifficulty] =
    useState('Beginner');

  const [
    instructions,
    setInstructions,
  ] = useState('');

  const [tips, setTips] =
    useState('');

  const [image, setImage] =
    useState<any>(null);

  const [imageUrl, setImageUrl] =
    useState('');

  const pickImage =
    async () => {
      const result =
        await ImagePicker.launchImageLibraryAsync(
          {
            mediaTypes:
              ImagePicker.MediaTypeOptions.Images,

            quality: 0.7,
          }
        );

      if (!result.canceled) {
        setImage(
          result.assets[0]
        );
      }
    };

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        let uploadedImage =
          '';

        // UPLOAD IMAGE
        if (image) {
          const uploaded =
            await uploadMedia({
              uri: image.uri,

              type: 'image/jpeg',

              name:
                'exercise.jpg',
            });

          uploadedImage =
            uploaded.url ||
            uploaded.secure_url;

          setImageUrl(
            uploadedImage
          );
        }

        await createExercise({
          name,
          description,

          duration:
            Number(duration),

          restTime:
            Number(restTime),

          targetMuscle,

          caloriesBurn:
            Number(caloriesBurn),

          difficulty,

          imageUrl:
            uploadedImage,

          instructions:
            instructions
              .split(',')
              .map((item) =>
                item.trim()
              ),

          tips: tips
            .split(',')
            .map((item) =>
              item.trim()
            ),
        });

        Alert.alert(
          'Success',
          'Exercise created successfully'
        );

        setName('');
        setDescription('');
        setDuration('');
        setRestTime('');
        setTargetMuscle('');
        setCaloriesBurn('');
        setInstructions('');
        setTips('');
        setImage(null);
        setImageUrl('');
      } catch (error: any) {
        console.log(error);

        Alert.alert(
          'Error',
          error?.message ||
            'Unable to create exercise'
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
      <Text style={styles.heading}>
        Create Exercise
      </Text>

      <Text style={styles.subheading}>
        Build guided exercises for
        workout sessions.
      </Text>

      <View style={styles.imageBox}>
        {image ? (
          <Image
            source={{
              uri: image.uri,
            }}
            style={styles.image}
          />
        ) : (
          <View
            style={
              styles.placeholder
            }
          >
            <Dumbbell
              size={54}
              color={
                Colors.primary
              }
            />
          </View>
        )}

        <Button
          style={
            styles.imageButton
          }
          onPress={pickImage}
        >
          <Camera
            size={18}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.imageButtonText
            }
          >
            Upload Exercise Image
          </Text>
        </Button>
      </View>

      <TextInput
        placeholder="Exercise Name"
        placeholderTextColor="#777"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor="#777"
        style={[
          styles.input,
          styles.textarea,
        ]}
        multiline
        value={description}
        onChangeText={
          setDescription
        }
      />

      <TextInput
        placeholder="Duration (seconds)"
        placeholderTextColor="#777"
        style={styles.input}
        keyboardType="numeric"
        value={duration}
        onChangeText={
          setDuration
        }
      />

      <TextInput
        placeholder="Rest Time (seconds)"
        placeholderTextColor="#777"
        style={styles.input}
        keyboardType="numeric"
        value={restTime}
        onChangeText={
          setRestTime
        }
      />

      <TextInput
        placeholder="Target Muscle"
        placeholderTextColor="#777"
        style={styles.input}
        value={targetMuscle}
        onChangeText={
          setTargetMuscle
        }
      />

      <TextInput
        placeholder="Calories Burn"
        placeholderTextColor="#777"
        style={styles.input}
        keyboardType="numeric"
        value={caloriesBurn}
        onChangeText={
          setCaloriesBurn
        }
      />

      <TextInput
        placeholder="Instructions separated by comma"
        placeholderTextColor="#777"
        style={[
          styles.input,
          styles.textarea,
        ]}
        multiline
        value={instructions}
        onChangeText={
          setInstructions
        }
      />

      <TextInput
        placeholder="Tips separated by comma"
        placeholderTextColor="#777"
        style={[
          styles.input,
          styles.textarea,
        ]}
        multiline
        value={tips}
        onChangeText={setTips}
      />

      <Button
        style={styles.submit}
        loading={loading}
        onPress={handleSubmit}
      >
        Create Exercise
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

  heading: {
    color: Colors.onSurface,
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 10,
  },

  subheading: {
    color: Colors.onSurfaceVariant,
    lineHeight: 24,
    marginBottom: 28,
  },

  imageBox: {
    marginBottom: 24,
  },

  placeholder: {
    height: 220,

    borderRadius: 30,

    backgroundColor:
      Colors.card,

    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: 220,

    borderRadius: 30,
  },

  imageButton: {
    marginTop: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'center',

    gap: 10,
  },

  imageButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  input: {
    backgroundColor:
      Colors.card,

    color: Colors.onSurface,

    borderRadius: 20,

    paddingHorizontal: 18,
    paddingVertical: 18,

    marginBottom: 18,
  },

  textarea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  submit: {
    marginTop: 14,
    borderRadius: 22,
  },
});
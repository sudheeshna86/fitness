import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { LogOut } from 'lucide-react-native';

import { useAuth } from '@/src/hooks/useAuth';
import { Colors } from '@/src/constants/theme';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

import { updateMyProfile } from '@/src/services/api/users';

import { ProfileHeader } from '@/src/components/profile/ProfileHeader';
import { ProfileStats } from '@/src/components/profile/ProfileStats';
import { UserInfoCard } from '@/src/components/profile/UserInfoCard';

export function ProfileScreen() {
  const { user, logout, reloadProfile } = useAuth();

  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user?.name || '');

  const [age, setAge] = useState(
    user?.age ? String(user.age) : ''
  );

  const [height, setHeight] = useState(
    user?.height ? String(user.height) : ''
  );

  const [weight, setWeight] = useState(
    user?.weight ? String(user.weight) : ''
  );

  const [gender, setGender] = useState(
    user?.gender || ''
  );

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      await updateMyProfile({
        name,
        age: Number(age),
        gender,
        height: Number(height),
        weight: Number(weight),
      });

      await reloadProfile();

      Alert.alert(
        'Success',
        'Profile updated successfully'
      );

      setEditing(false);
    } catch (error: any) {
      Alert.alert(
        'Update Failed',
        error?.response?.data?.message ||
          'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          user={user}
          onEdit={() => setEditing(true)}
        />

        <ProfileStats user={user} />

        <UserInfoCard user={user} />

        <Card style={styles.goalCard}>
          <Text style={styles.sectionHeading}>
            Fitness Goals
          </Text>

          {user?.fitnessGoals?.length ? (
            user.fitnessGoals.map(
              (goal: string, index: number) => (
                <View
                  key={index}
                  style={styles.goalChip}
                >
                  <Text style={styles.goalChipText}>
                    {goal}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text style={styles.emptyText}>
              No fitness goals added yet.
            </Text>
          )}
        </Card>

        <Card style={styles.achievementCard}>
          <Text style={styles.sectionHeading}>
            Achievements
          </Text>

          {user?.achievements?.length ? (
            user.achievements.map(
              (item: string, index: number) => (
                <View
                  key={index}
                  style={styles.achievementItem}
                >
                  <Text style={styles.achievementText}>
                    {item}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text style={styles.emptyText}>
              Complete workouts to unlock
              achievements.
            </Text>
          )}
        </Card>

        <Button
          variant="ghost"
          style={styles.logoutButton}
          onPress={async () => await logout()}
        >
          <LogOut
            size={18}
            color={Colors.error}
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Button>
      </ScrollView>

      <Modal
        visible={editing}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Edit Profile
            </Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Full Name"
              placeholderTextColor={
                Colors.onSurfaceVariant
              }
            />

            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Age"
              keyboardType="numeric"
              placeholderTextColor={
                Colors.onSurfaceVariant
              }
            />

            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Gender"
              placeholderTextColor={
                Colors.onSurfaceVariant
              }
            />

            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="Height (cm)"
              keyboardType="numeric"
              placeholderTextColor={
                Colors.onSurfaceVariant
              }
            />

            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="Weight (kg)"
              keyboardType="numeric"
              placeholderTextColor={
                Colors.onSurfaceVariant
              }
            />

            <Button
              style={styles.saveButton}
              onPress={handleUpdateProfile}
            >
              {loading
                ? 'Saving...'
                : 'Save Changes'}
            </Button>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditing(false)}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  goalCard: {
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
  },

  achievementCard: {
    borderRadius: 28,
    padding: 22,
    marginBottom: 24,
  },

  sectionHeading: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 18,
  },

  goalChip: {
    backgroundColor:
      'rgba(59,130,246,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 12,
  },

  goalChipText: {
    color: Colors.primary,
    fontWeight: '700',
  },

  achievementItem: {
    backgroundColor:
      'rgba(168,85,247,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 18,
    marginBottom: 12,
  },

  achievementText: {
    color: Colors.onSurface,
    fontWeight: '700',
  },

  emptyText: {
    color: Colors.onSurfaceVariant,
    fontSize: 14,
  },

  logoutButton: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.error,
    backgroundColor: 'transparent',
    paddingVertical: 16,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  logoutText: {
    color: Colors.error,
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: Colors.card,
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },

  modalTitle: {
    color: Colors.onSurface,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 24,
  },

  input: {
    backgroundColor: Colors.background,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: Colors.onSurface,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  saveButton: {
    marginTop: 10,
    borderRadius: 18,
  },

  cancelButton: {
    alignItems: 'center',
    marginTop: 16,
  },

  cancelText: {
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
  },
});
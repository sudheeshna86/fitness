import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Bell, ChevronRight, LogOut, Shield, Smartphone, Settings } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { Colors } from '@/src/constants/theme';
import { useAuth } from '@/src/hooks/useAuth';
import { updateUserProfile } from '@/src/services/api/users';

const settingsItems = [
  { title: 'Notifications', icon: <Bell size={20} color={Colors.onSurfaceVariant} /> },
  { title: 'Privacy & Security', icon: <Shield size={20} color={Colors.onSurfaceVariant} /> },
  { title: 'Connected Devices', icon: <Smartphone size={20} color={Colors.onSurfaceVariant} />, status: '3 ACTIVE' },
];

export function ProfileScreen() {
  const { user, logout, reloadProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [age, setAge] = useState(String(user?.age ?? 0));
  const [height, setHeight] = useState(String(user?.height ?? 0));
  const [weight, setWeight] = useState(String(user?.weight ?? 0));

  const handleSave = async () => {
    try {
      const updated = await updateUserProfile(user?.id ?? '', {
        name,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
      });
      setEditing(false);
      await reloadProfile();
      Alert.alert('Saved', 'Profile information has been updated.');
    } catch (error: any) {
      Alert.alert('Update failed', error?.message || 'Unable to update profile.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarShell}>
          <Image source={{ uri: user?.profileImage || 'https://i.pravatar.cc/150?u=fitness' }} style={styles.avatar} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileSub}>{user?.role.toUpperCase()} MEMBER</Text>
        </View>
        <View style={styles.editAction}>
          <Button variant="secondary" style={styles.editButton} onPress={() => setEditing((value) => !value)}>
            <Text style={styles.editButtonText}>{editing ? 'CANCEL' : 'EDIT'}</Text>
          </Button>
        </View>
      </View>

      {editing ? (
        <View style={styles.profileForm}>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor={Colors.onSurfaceVariant} />
          <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" placeholder="Age" placeholderTextColor={Colors.onSurfaceVariant} />
          <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" placeholder="Height (cm)" placeholderTextColor={Colors.onSurfaceVariant} />
          <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="Weight (kg)" placeholderTextColor={Colors.onSurfaceVariant} />
          <Button style={styles.saveButton} onPress={handleSave}>Save Profile</Button>
        </View>
      ) : null}

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{user?.workoutsCompleted ?? 0}</Text>
          <Text style={styles.statLabel}>WORKOUTS</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: Colors.tertiary }]}>{user?.bmi?.toFixed(1) ?? 0}</Text>
          <Text style={styles.statLabel}>BMI</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={[styles.statValue, { color: Colors.primary }]}>{user?.weight ?? 0}</Text>
          <Text style={styles.statLabel}>WEIGHT</Text>
        </Card>
      </View>

      <Text style={styles.sectionHeading}>Achievements</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeSlider} contentContainerStyle={{ gap: 16 }}>
        {user?.achievements?.map((badge, index) => (
          <View key={`${badge}-${index}`} style={[styles.badgeCard, styles.badgePrimary]}>
            <Settings size={28} color={Colors.onSurface} />
            <Text style={styles.badgeLabel}>{badge}</Text>
          </View>
        ))}
      </ScrollView>

      <Card style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <View style={styles.goalIcon}><Settings size={24} color={Colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.goalTitle}>Focus Goal</Text>
            <Text style={styles.goalSubtitle}>{user?.fitnessGoals?.[0] ?? 'Stay consistent'}</Text>
          </View>
          <Text style={styles.goalPercent}>{Math.round(user?.streak ?? 0 * 2)}%</Text>
        </View>
        <View style={styles.goalTrack}><View style={styles.goalFill} /></View>
      </Card>

      <Text style={styles.sectionHeading}>System Preferences</Text>
      <Card style={styles.settingsCard}>
        {settingsItems.map((item, index) => (
          <View key={item.title} style={[styles.settingRow, index !== settingsItems.length - 1 && styles.settingDivider]}>
            <View style={styles.settingRowLeft}>
              {item.icon}
              <Text style={styles.settingTitle}>{item.title}</Text>
            </View>
            <View style={styles.settingRowRight}>
              {item.status ? <Text style={styles.settingStatus}>{item.status}</Text> : null}
              <ChevronRight size={18} color={Colors.onSurfaceVariant} />
            </View>
          </View>
        ))}
      </Card>

      <Button variant="ghost" style={styles.signOutButton} onPress={async () => await logout()}>
        <LogOut size={18} color={Colors.error} />
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 120,
    gap: 18,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  avatarShell: {
    width: 96,
    height: 96,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: Colors.onSurface,
    fontSize: 26,
    fontWeight: '900',
  },
  profileSub: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  editAction: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 22,
  },
  statValue: {
    color: Colors.onSurface,
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    color: Colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 6,
  },
  sectionHeading: {
    color: Colors.onSurface,
    fontSize: 20,
    fontWeight: '900',
  },
  badgeSlider: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  badgeCard: {
    width: 120,
    height: 150,
    borderRadius: 28,
    padding: 18,
    justifyContent: 'space-between',
  },
  badgePrimary: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  badgeSecondary: {
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
  },
  badgeTertiary: {
    backgroundColor: 'rgba(167, 139, 250, 0.18)',
  },
  badgeLabel: {
    color: Colors.onSurface,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 12,
  },
  goalCard: {
    padding: 22,
    overflow: 'hidden',
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  goalIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTitle: {
    color: Colors.onSurface,
    fontSize: 18,
    fontWeight: '900',
  },
  goalSubtitle: {
    color: Colors.onSurfaceVariant,
    fontSize: 12,
  },
  goalPercent: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: '900',
  },
  goalTrack: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  goalFill: {
    width: '65%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },
  settingsCard: {
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingAvatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingAvatarImage: {
    width: '100%',
    height: '100%',
  },
  settingTitle: {
    color: Colors.onSurface,
    fontSize: 15,
    fontWeight: '700',
  },
  settingRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingStatus: {
    color: Colors.tertiary,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  signOutButton: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.error,
    backgroundColor: 'transparent',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  signOutText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

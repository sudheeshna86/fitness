import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame, Pencil } from 'lucide-react-native';

import { Button } from '@/src/components/ui/Button';
import { Colors } from '@/src/constants/theme';

interface Props {
  user: any;
  onEdit: () => void;
}

export function ProfileHeader({ user, onEdit }: Props) {
  return (
    <LinearGradient
      colors={['#1E293B', '#0F172A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topRow}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri:
                user?.profileImage ||
                'https://i.pravatar.cc/300?u=fittrack',
            }}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>
            <Text style={styles.name}>{user?.name || 'Fitness User'}</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <View style={styles.badgeRow}>
              <View style={styles.streakBadge}>
                <Flame size={14} color="#F97316" />
                <Text style={styles.streakText}>
                  {user?.streak || 0} Day Streak
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Button variant="secondary" style={styles.editButton} onPress={onEdit}>
          <Pencil size={16} color={Colors.onSurface} />
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    padding: 24,
    marginBottom: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileSection: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  email: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    fontSize: 14,
  },
  badgeRow: {
    marginTop: 14,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 6,
  },
  streakText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  editButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
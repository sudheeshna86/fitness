import { Challenge, Badge } from '@/src/types';

export const mockChallenges: Challenge[] = [
  {
    id: 'c1',
    title: '10k Steps Daily',
    description: 'Keep your metabolic engine running with a consistent daily step target.',
    progress: 8420,
    target: 10000,
    unit: 'steps',
    status: 'Live',
    participants: 8400,
    endsInDays: 14,
    image: 'https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'c2',
    title: 'Hyper-Row Mastery 2024',
    description: 'Elite performance challenge focusing on endurance and wattage.',
    progress: 50,
    target: 100,
    unit: '%',
    status: 'Live',
    participants: 8400,
    endsInDays: 14,
    image: 'https://images.unsplash.com/photo-1544216717-3bbf52512659?q=80&w=800&auto=format&fit=crop',
  },
];

export const mockBadges: Badge[] = [
  { id: 'b1', name: 'Early Bird', level: 3, icon: 'military_tech', color: 'tertiary' },
  { id: 'b2', name: '7 Day Streak', icon: 'local_fire_department', color: 'primary' },
  { id: 'b3', name: 'Marathoner', icon: 'directions_run', color: 'secondary' },
  { id: 'b4', name: 'Elite Fit', icon: 'workspace_premium', color: 'tertiary' },
];

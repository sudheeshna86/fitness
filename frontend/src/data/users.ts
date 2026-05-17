import { User, Activity } from '@/src/types';
import { mockBadges } from '@/src/data/challenges';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Sterling',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiKyE0iNxV046SjKcRVSIVS0DkDSg9dzwVk-3asKG-jypFBvtSxIum2EZDZYJprl0G0cKQibzgiJifNvNiE4W1cLpN8CxCg_S8th5ISyPm85iUO-RrWW5IuEiUv9pdv80rS2oSDM8lVo9YzmvjejV9nv91U38BKAVzyaac5HeujKlmyWrK60ys4TtAmEV4SFvtdovO_dM7kdTph91z-OMDgOjEWXuV-M5Ztuc160q4szZ5Fg4eAbmwprMjBlx35XmJ99NlzyY1kU',
  tier: 'Elite',
  since: '2023',
  stats: {
    workouts: 142,
    bmi: 22.4,
    weight: 76.5,
  },
  achievements: mockBadges,
  activeGoals: [
    { id: 'g1', title: 'Weight Loss Goal', targetValue: '72.0 kg', currentProgress: 65 },
  ],
};

export const recentActivities: Activity[] = [
  { id: 'a1', title: 'Upper Body Power', duration: 45, intensity: 'High', kcal: 320, icon: 'fitness_center' },
  { id: 'a2', title: 'Morning Sprint', duration: 20, intensity: 'Recovery', kcal: 180, icon: 'directions_run' },
];

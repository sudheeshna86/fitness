import { AnalyticsData } from '@/src/types';

export const mockAnalytics: AnalyticsData = {
  totalUsers: 12480,
  activeUsers: 8420,
  totalWorkouts: 45200,
  caloriesBurned: 12400000,
  weeklyEngagement: [
    { name: 'Mon', engagement: 4000 },
    { name: 'Tue', engagement: 3000 },
    { name: 'Wed', engagement: 2000 },
    { name: 'Thu', engagement: 2780 },
    { name: 'Fri', engagement: 1890 },
    { name: 'Sat', engagement: 2390 },
    { name: 'Sun', engagement: 3490 },
  ],
  userGrowth: [
    { date: 'Jan', users: 2000 },
    { date: 'Feb', users: 3500 },
    { date: 'Mar', users: 5000 },
    { date: 'Apr', users: 7800 },
    { date: 'May', users: 10200 },
    { date: 'Jun', users: 12480 },
  ],
  topExercises: [
    { name: 'Push Ups', count: 1200, color: '#3b82f6' },
    { name: 'Squats', count: 980, color: '#8b5cf6' },
    { name: 'Plank', count: 850, color: '#10b981' },
    { name: 'Burpees', count: 720, color: '#f59e0b' },
    { name: 'Running', count: 600, color: '#ef4444' },
  ],
};

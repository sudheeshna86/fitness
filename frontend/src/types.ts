export interface Workout {
  id: string;
  title: string;
  trainer: string;
  category: 'HIIT' | 'Yoga' | 'Strength' | 'Recovery';
  difficulty: 'Basic' | 'Pro' | 'Elite';
  duration: number;
  calories: number;
  image: string;
  isFeatured?: boolean;
  description?: string;
  movements?: Movement[];
}

export interface Movement {
  id: string;
  name: string;
  sets: number;
  reps: number;
  image: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  status: 'Live' | 'Draft' | 'Ended';
  participants: number;
  endsInDays: number;
  image?: string;
}

export interface Badge {
  id: string;
  name: string;
  level?: number;
  icon: string;
  color: 'primary' | 'tertiary' | 'secondary';
}

export interface Goal {
  id: string;
  title: string;
  targetValue: string;
  currentProgress: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  tier: 'Elite' | 'Pro' | 'Basic';
  since: string;
  stats: {
    workouts: number;
    bmi: number;
    weight: number;
  };
  achievements: Badge[];
  activeGoals: Goal[];
}

export interface Activity {
  id: string;
  title: string;
  duration: number;
  intensity: 'High' | 'Medium' | 'Recovery';
  kcal: number;
  icon: string;
}

export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalWorkouts: number;
  caloriesBurned: number;
  weeklyEngagement: { name: string; engagement: number }[];
  userGrowth: { date: string; users: number }[];
  topExercises: { name: string; count: number; color: string }[];
}

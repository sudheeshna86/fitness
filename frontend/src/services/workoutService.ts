import { fetchWorkouts, fetchWorkoutById } from '@/src/services/api/workouts';

function normalizeWorkout(raw: any) {
  if (!raw) return raw;
  return {
    ...raw,
    id: raw.id ?? raw._id ?? raw._id?.toString?.() ?? raw.id,
    calories: raw.calories ?? raw.caloriesBurn ?? raw.caloriesBurn?.toString?.(),
    thumbnail: raw.thumbnail ?? raw.image ?? ''
  };
}

export const workoutService = {
  getWorkouts: async () => {
    const list = await fetchWorkouts();
    if (!Array.isArray(list)) return list;
    return list.map(normalizeWorkout);
  },
  getWorkoutById: async (id: string) => {
    const raw = await fetchWorkoutById(id);
    return normalizeWorkout(raw);
  },
};

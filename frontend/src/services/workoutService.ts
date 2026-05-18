import { fetchWorkouts, fetchWorkoutById } from '@/src/services/api/workouts';
import { axiosInstance } from '@/src/services/api/axios';

const resolveBackendUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const baseUrl = axiosInstance.defaults.baseURL?.replace(/\/api\/?$/, '') || '';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

function normalizeWorkout(raw: any) {
  if (!raw) return raw;
  const imagePath = raw.thumbnail ?? raw.image ?? '';
  const imageUrl = resolveBackendUrl(imagePath);

  return {
    ...raw,
    id: raw.id ?? raw._id ?? raw._id?.toString?.() ?? raw.id,
    image: imageUrl,
    thumbnail: imageUrl,
    calories: raw.calories ?? raw.caloriesBurn ?? raw.caloriesBurn?.toString?.(),
    trainer: raw.trainer ?? raw.createdBy?.name ?? 'Unknown',
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

import { axiosInstance } from './axios';

export const fetchWorkouts = async () => {
  const response = await axiosInstance.get('/workouts');
  return response.data;
};

export const fetchWorkoutById = async (id: string) => {
  const response = await axiosInstance.get(`/workouts/${id}`);
  return response.data;
};

export const createWorkout = async (payload: any) => {
  const response = await axiosInstance.post('/workouts', payload);
  return response.data;
};

export const updateWorkout = async (id: string, payload: any) => {
  const response = await axiosInstance.put(`/workouts/${id}`, payload);
  return response.data;
};

export const deleteWorkout = async (id: string) => {
  const response = await axiosInstance.delete(`/workouts/${id}`);
  return response.data;
};

export const completeWorkout = async (id: string) => {
  const response = await axiosInstance.post(`/workouts/${id}/complete`);
  return response.data;
};

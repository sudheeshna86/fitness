import { axiosInstance } from './axios';

export const addSleepEntry = async (payload: any) => {
  const response = await axiosInstance.post('/sleep', payload);
  return response.data;
};

export const fetchSleepForUser = async (userId: string) => {
  const response = await axiosInstance.get(`/sleep/${userId}`);
  return response.data;
};

export const updateSleepEntry = async (id: string, payload: any) => {
  const response = await axiosInstance.put(`/sleep/${id}`, payload);
  return response.data;
};

import { axiosInstance } from './axios';

export const addWaterEntry = async (payload: any) => {
  const response = await axiosInstance.post('/water', payload);
  return response.data;
};

export const fetchWaterForUser = async (userId: string) => {
  const response = await axiosInstance.get(`/water/${userId}`);
  return response.data;
};

export const updateWaterEntry = async (id: string, payload: any) => {
  const response = await axiosInstance.put(`/water/${id}`, payload);
  return response.data;
};

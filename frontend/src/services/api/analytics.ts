import { axiosInstance } from './axios';

export const fetchAnalytics = async () => {
  const response = await axiosInstance.get('/analytics');
  return response.data;
};

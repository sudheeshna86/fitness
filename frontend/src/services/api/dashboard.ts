import { axiosInstance } from './axios';

export const fetchDashboard =
  async () => {
    const response =
      await axiosInstance.get(
        '/dashboard'
      );

    return response.data;
  };
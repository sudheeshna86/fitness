import { axiosInstance } from './axios';

export interface UserProfileUpdate {
  name?: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  fitnessGoals?: string[];
  profileImage?: string;
}

export const fetchProfile = async () => {
  const response = await axiosInstance.get('/users/profile');

  return response.data.user;
};

export const fetchUserById = async (id: string) => {
  const response = await axiosInstance.get(`/users/${id}`);

  return response.data.user;
};

export const updateMyProfile = async (
  payload: UserProfileUpdate
) => {
  const response = await axiosInstance.put(
    '/users/profile',
    payload
  );

  return response.data.user;
};

export const updateUserProfile = async (
  id: string,
  payload: UserProfileUpdate
) => {
  const response = await axiosInstance.put(
    `/users/${id}`,
    payload
  );

  return response.data.user;
};
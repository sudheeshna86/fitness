import { axiosInstance } from './axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  profileImage?: string;
  fitnessGoals?: string[];
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await axiosInstance.post('/auth/login', payload);
  return response.data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post('/auth/register', payload);
  return response.data;
};

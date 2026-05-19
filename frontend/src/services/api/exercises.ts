import { axiosInstance } from './axios';

export const fetchExercises =
  async () => {
    const response =
      await axiosInstance.get(
        '/exercises'
      );

    return response.data;
  };

export const fetchExerciseById =
  async (id: string) => {
    const response =
      await axiosInstance.get(
        `/exercises/${id}`
      );

    return response.data;
  };

export const createExercise =
  async (payload: any) => {
    const response =
      await axiosInstance.post(
        '/exercises',
        payload
      );

    return response.data;
  };

export const updateExercise =
  async (
    id: string,
    payload: any
  ) => {
    const response =
      await axiosInstance.put(
        `/exercises/${id}`,
        payload
      );

    return response.data;
  };

export const deleteExercise =
  async (id: string) => {
    const response =
      await axiosInstance.delete(
        `/exercises/${id}`
      );

    return response.data;
  };
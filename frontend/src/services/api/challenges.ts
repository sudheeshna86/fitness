import { axiosInstance } from './axios';

export const fetchChallenges = async () => {
  const response =
    await axiosInstance.get('/challenges');

  return response.data.challenges;
};

export const fetchMyChallenges =
  async () => {
    const response =
      await axiosInstance.get(
        '/challenges/my-challenges'
      );

    return response.data.challenges;
  };

export const createChallenge = async (
  payload: any
) => {
  const response =
    await axiosInstance.post(
      '/challenges',
      payload
    );

  return response.data.challenge;
};

export const updateChallenge = async (
  id: string,
  payload: any
) => {
  const response =
    await axiosInstance.put(
      `/challenges/${id}`,
      payload
    );

  return response.data.challenge;
};

export const deleteChallenge = async (
  id: string
) => {
  const response =
    await axiosInstance.delete(
      `/challenges/${id}`
    );

  return response.data;
};

export const joinChallenge = async (
  id: string
) => {
  const response =
    await axiosInstance.post(
      `/challenges/${id}/join`
    );

  return response.data.userChallenge;
};

export const completeChallengeDay =
  async (id: string) => {
    const response =
      await axiosInstance.post(
        `/challenges/progress/${id}`
      );

    return response.data.userChallenge;
  };
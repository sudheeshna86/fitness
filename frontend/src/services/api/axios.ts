import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const extraApiUrl = Constants.expoConfig?.extra?.apiUrl;
let apiUrl = extraApiUrl || 'http://localhost:4000/api';

if (Platform.OS === 'android') {
  apiUrl = apiUrl.replace('localhost', '10.0.2.2').replace('127.0.0.1', '10.0.2.2');
}

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

import { axiosInstance } from './axios';
import { Platform } from 'react-native';

export interface MediaPayload {
  uri: string;
  type: string;
  name: string;
}

export const uploadMedia = async (file: MediaPayload) => {
  const formData = new FormData();

  if (Platform.OS === 'web') {
    const res = await fetch(file.uri);
    const blob = await res.blob();
    formData.append('file', blob, file.name);
  } else {
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);
  }

  // Use native fetch for multipart FormData to avoid axiosInstance default headers interfering
  const base = axiosInstance.defaults.baseURL || '';
  const url = base.endsWith('/') ? `${base}upload` : `${base}/upload`;
  const authHeader = (axiosInstance.defaults.headers && axiosInstance.defaults.headers.common && axiosInstance.defaults.headers.common.Authorization) || null;

  const headers: Record<string, string> = {};
  if (authHeader) headers.Authorization = authHeader;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed (${response.status}): ${text}`);
  }

  return await response.json();
};

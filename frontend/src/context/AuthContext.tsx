import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser } from '@/src/services/api/auth';
import { fetchProfile } from '@/src/services/api/users';
import { setAuthToken } from '@/src/services/api/axios';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  streak: number;
  role: 'user' | 'admin';
  achievements: string[];
  fitnessGoals: string[];
  profileImage: string;
}

interface AuthContextValue {
  _id: string;
  user: User | null;
  token: string | null;
  loading: boolean;
  authenticating: boolean;
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  register: (payload: any) => Promise<{ user: User; token: string }>;
  logout: () => Promise<void>;
  reloadProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = '@fitnessapp_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);

  const loadSession = async () => {
    try {
      const savedToken = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedToken) {
        setAuthToken(savedToken);
        setToken(savedToken);
        const profile = await fetchProfile();
        setUser(profile);
      }
    } catch (error) {
      console.error('Failed to restore session', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthenticating(true);
    try {
      const result = await loginUser({ email, password });
      setAuthToken(result.token);
      setToken(result.token);
      setUser(result.user);
      await AsyncStorage.setItem(STORAGE_KEY, result.token);
      return result;
    } finally {
      setAuthenticating(false);
    }
  };

  const register = async (payload: any) => {
    setAuthenticating(true);
    try {
      const result = await registerUser(payload);
      setAuthToken(result.token);
      setToken(result.token);
      setUser(result.user);
      await AsyncStorage.setItem(STORAGE_KEY, result.token);
      return result;
    } finally {
      setAuthenticating(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const reloadProfile = async () => {
    if (!token) return;
    const profile = await fetchProfile();
    setUser(profile);
  };

  const value = useMemo(
    () => ({ user, token, loading, authenticating, login, register, logout, reloadProfile }),
    [user, token, loading, authenticating]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

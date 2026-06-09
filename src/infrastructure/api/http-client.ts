import axios, { type AxiosInstance } from 'axios';
import { env } from '@/core/config/env';

/**
 * Shared Axios instance. When VITE_API_BASE_URL is empty the app runs fully on
 * in-memory mock repositories (see data/repositories), so this client is only
 * used once a real backend is configured.
 */
export const httpClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('aio.token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error),
);

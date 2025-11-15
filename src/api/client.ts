import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';

/**
 * Axios instance configured for the Java REST API
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Add authentication tokens, logging, or modify requests before they are sent
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development
    if (env.isDevelopment) {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle common response scenarios like authentication errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log responses in development
    if (env.isDevelopment) {
      console.log('✅ API Response:', response.config.url, response.status);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle common error scenarios
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          console.error('❌ Forbidden: You do not have permission to access this resource');
          break;
        case 404:
          console.error('❌ Not Found: The requested resource was not found');
          break;
        case 500:
          console.error('❌ Server Error: Something went wrong on the server');
          break;
        default:
          console.error('❌ API Error:', error.message);
      }
    } else if (error.request) {
      console.error('❌ Network Error: No response received from server');
    } else {
      console.error('❌ Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

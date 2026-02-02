import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Vite env variable
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// Response Interceptor (Optional: Simplifies data extraction)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    // Global error handling (e.g., redirect to login on 401)
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
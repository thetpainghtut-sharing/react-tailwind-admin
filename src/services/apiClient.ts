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
    // 1. Get the item ONCE
    const storedUser = localStorage.getItem('user');

    // 2. Check if it exists (is not null and not empty)
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        
        // 3. Check for token
        if (userObj.token) {
          config.headers.Authorization = `Bearer ${userObj.token}`;
        }
      } catch (e) {
        // Optional: Handle corrupted JSON in local storage
        console.error("Could not parse user data", e);
        localStorage.removeItem('user'); // Clean up bad data
      }
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
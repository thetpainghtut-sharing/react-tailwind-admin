import apiClient from "./apiClient";

export const AuthService = {
  // Login
  login: async (payload: {email: string, password: string}): Promise<any> => {
    const response = await apiClient.post<{data: any}>('/login', payload);
    return response.data;
  },

  // Loout
  logout: async (): Promise<any> => {
    const response = await apiClient.post<{data: any}>('/logout');
    return response.data;
  },
}
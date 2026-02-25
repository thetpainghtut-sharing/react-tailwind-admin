
import { Department, ApiResponse } from '../types/department.types';
import apiClient from './apiClient';
// 1. Create a helper interface for the API response structure
interface DepartmentResponse {
  data: Department[];
}

export const GoalService = {
  // Get all users
  getAllAssets: async (type: string): Promise<any[]> => {
    // We tell axios that the response body is of type User[]
    const response = await apiClient.get<any>(`/allAssets?status=${type}`);
    return response.data.data;
  },

  getAllEmployees: async (): Promise<any[]> => {
    // We tell axios that the response body is of type User[]
    const response = await apiClient.get<any>('/employees');
    return response.data.data;
  },

  assign: async (payload: any): Promise<any> => {
    const response = await apiClient.post<{data: any}>('/assign', payload);
    return response.data.data;
  },
};

import { Department, ApiResponse } from '../types/department.types';
import apiClient from './apiClient';
// 1. Create a helper interface for the API response structure
interface DepartmentResponse {
  data: Department[];
}

export const DepartmentService = {
  // Get all users
  getAll: async (): Promise<Department[]> => {
    // We tell axios that the response body is of type User[]
    const response = await apiClient.get<DepartmentResponse>('/departments');
    return response.data.data;
  },

  // Get single user by ID
  getById: async (id: number): Promise<Department> => {
    const response = await apiClient.get<{data: Department}>(`/departments/${id}`);
    return response.data.data;
  },

  // Create a new user
  create: async (payload: Omit<Department, 'id' | 'createdAgo'>): Promise<Department> => {
    const response = await apiClient.post<{data: Department}>('/departments', payload);
    return response.data.data;
  },

  // Update a new user
  update: async (payload: Omit<Department, 'id' | 'createdAgo'>, id: number): Promise<Department> => {
    const response = await apiClient.post<{data: Department}>(`/departments/${id}`, payload);
    return response.data.data;
  },
  
  // Example with a wrapped response structure (e.g. Laravel API Resources)
  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/departments/${id}`);
    return response.data;
  }
};
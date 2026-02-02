
import { Department, ApiResponse } from '../types/department.types';
import apiClient from './apiClient';

export const DepartmentService = {
  // Get all users
  getAll: async (): Promise<Department[]> => {
    // We tell axios that the response body is of type User[]
    const response = await apiClient.get<Department[]>('/departments');
    return response.data;
  },

  // Get single user by ID
  getById: async (id: number): Promise<Department> => {
    const response = await apiClient.get<Department>(`/departments/${id}`);
    return response.data;
  },

  // Create a new user
  create: async (payload: Omit<Department, 'id' | 'createdAgo'>): Promise<Department> => {
    const response = await apiClient.post<Department>('/departments', payload);
    return response.data;
  },
  
  // Example with a wrapped response structure (e.g. Laravel API Resources)
  // delete: async (id: number): Promise<ApiResponse<null>> => {
  //   const response = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
  //   return response.data;
  // }
};
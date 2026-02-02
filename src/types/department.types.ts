// The shape of a single User object
export interface Department {
  id: number;
  title: string;
  createdAgo: string;
}

// Standard API Response wrapper (optional, depends on your backend)
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
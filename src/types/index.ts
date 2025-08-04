// Shared TypeScript interfaces and types for the frontend

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: Patient[];
}

export interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  ownerId: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  patientId: string;
  date: string;
  status: AppointmentStatus;
  notes?: string;
}

export type AppointmentStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "no_show"
  | "blocked";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: ApiError;
}

export interface ApiError {
  message: string;
  code?: string | number;
}

export interface AppointmentInput {
  clientId: string;
  patientId: string;
  date: string;
  notes?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JWT {
  token: string;
  expires: string;
}

// Add more types as needed for the app

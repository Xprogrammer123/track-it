export interface User {
  id: string;
  name: string;
  email: string;
  country: string;
  registrationDate: string;
}

export interface AdminUser {
  username: string;
  role: 'admin';
}

export interface AuthState {
  user: User | AdminUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
}

export interface PasswordChangeData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
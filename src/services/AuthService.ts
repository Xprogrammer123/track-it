import axios from "axios";
import type { LoginCredentials, RegistrationData, User } from "../types/auth";
import Cookies from "js-cookie";

const API_BASE_URL = "https://track-it-api.vercel.app/api";

export interface RegisterResponse {
  token: string;
  user: User;
}

export const registerUser = async (
  data: RegistrationData
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    const { token } = response.data;

    // Save token upon successful login
    saveAuthToken(token);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw new Error("An unexpected error occurred");
  }
};

export interface LoginResponse {
  token: string;
  user: User;
}

export const loginUser = async (
  data: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    const { token } = response.data;

    // Save token upon successful login
    saveAuthToken(token);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("An unexpected error occurred");
  }
};

// Save auth token securely
export const saveAuthToken = (token: string) => {
  Cookies.set("authToken", token, {
    expires: 7, // Token expiration in days
    secure: true, // Ensure the token is transmitted securely (https)
    sameSite: "Strict", // Prevent CSRF attacks by restricting cross-site usage
  });
};

// Get the current auth token
export const getAuthToken = (): string | undefined => {
  return Cookies.get("authToken");
};

// Remove auth token during logout or session invalidation
export const removeAuthToken = () => {
  Cookies.remove("authToken");
};

// Fetch user details
export const fetchUser = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("User is not authenticated");

  try {
    const response = await axios.get(`${API_BASE_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return the user data
  } catch (error: any) {
    throw new Error(error.response?.data.message || "Failed to fetch user data");
  }
};
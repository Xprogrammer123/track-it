import React, { createContext, useContext, useReducer, useEffect } from "react";
import { loginUser, registerUser, removeAuthToken, getAuthToken } from "../services/AuthService";
import type { LoginCredentials, RegistrationData, User, AdminUser } from "../types/auth";

// Define the AuthState and Action types
interface AuthState {
  isAuthenticated: boolean;
  user: User | AdminUser | null;
  token: string | null;
  isAdmin: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: { user: User | AdminUser; token: string } }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: User | AdminUser }
  | { type: "LOAD_TOKEN"; payload: string | null }
  | { type: "SET_ADMIN"; payload: boolean };

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isAdmin: false, // Admin flag
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isAdmin: (action.payload.user as AdminUser).role === 'admin',
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        isAdmin: false,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_ADMIN":
      return {
        ...state,
        isAdmin: action.payload,
      };
    case "LOAD_TOKEN":
      return {
        ...state,
        token: action.payload,
        isAuthenticated: Boolean(action.payload),
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<{
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
  setAdmin: (isAdmin: boolean) => void;
}>({
  state: initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  setAdmin: () => {},
});

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load token from cookies on initialization
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      dispatch({ type: "LOAD_TOKEN", payload: token });
    }
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      const { user, token } = await loginUser(credentials);
      dispatch({ type: "LOGIN", payload: { user, token } });
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  // Register function
  const register = async (data: RegistrationData) => {
    try {
      const { user, token } = await registerUser(data);
      dispatch({ type: "LOGIN", payload: { user, token } });
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    }
  };

  // Logout function
  const logout = () => {
    removeAuthToken();
    dispatch({ type: "LOGOUT" });
  };

  // Set admin flag function
  const setAdmin = (isAdmin: boolean) => {
    dispatch({ type: "SET_ADMIN", payload: isAdmin });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

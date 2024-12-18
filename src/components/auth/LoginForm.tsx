import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface LoginCredentials {
  email: string;
  password: string;
}

interface Props {
  type: "user" | "admin";
  onForgotPassword: () => void;
  onRegister?: () => void;
}

export default function LoginForm({
  type,
  onForgotPassword,
  onRegister,
}: Props) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth(); // Access the login function from AuthContext
  const navigate = useNavigate(); // For navigation after login

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // Clear previous error messages

    try {
      await login(credentials); 
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.message || "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {type === "admin" ? "Admin Login" : "Welcome Back"}
        </h2>
        <p className="text-gray-600">
          {type === "admin"
            ? "Sign in to access the admin dashboard"
            : "Sign in to track your packages"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Email/Username Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {type === "admin" ? "Username" : "Email"}
          </label>
          <input
            id="email"
            type={type === "admin" ? "text" : "email"}
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            placeholder={
              type === "admin" ? "Enter your username" : "Enter your email"
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-600 text-sm text-center mt-2">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4 mr-2" />
              <span>Sign In</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Footer Links */}
      <div className="mt-4 space-y-2 text-center">
        <button
          onClick={onForgotPassword}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Forgot your password?
        </button>

        <div>
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            className="text-sm text-red-600 hover:text-red-700"
          >
            Create One
          </Link>
        </div>
      </div>
    </div>
  );
}

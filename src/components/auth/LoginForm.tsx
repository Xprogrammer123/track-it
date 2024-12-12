import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import type { LoginCredentials } from '../../types/auth';

interface Props {
  type: 'user' | 'admin';
  onForgotPassword: () => void;
  onRegister: () => void;
}

export default function LoginForm({ type, onForgotPassword, onRegister }: Props) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {type === 'admin' ? 'Admin Login' : 'Welcome Back'}
        </h2>
        <p className="text-gray-600">
          {type === 'admin' 
            ? 'Sign in to access the admin dashboard'
            : 'Sign in to track your packages'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'admin' ? 'Username' : 'Email'}
          </label>
          <input
            type={type === 'admin' ? 'text' : 'email'}
            required
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
            />
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </div>
          )}
        </motion.button>
      </form>

      <div className="space-y-2 text-center">
        <button
          onClick={onForgotPassword}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Forgot your password?
        </button>
        
        {type === 'user' && (
          <div>
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <button
              onClick={onRegister}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
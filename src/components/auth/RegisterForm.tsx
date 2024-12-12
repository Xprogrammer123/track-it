import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import type { RegistrationData } from '../../types/auth';
import { Link } from 'react-router-dom';

interface Props {
  onLogin: () => void;
}

interface FormField {
  label: string;
  type: string;
  name: keyof RegistrationData;
}

const formFields: FormField[] = [
  { label: 'Full Name', type: 'text', name: 'name' },
  { label: 'Email', type: 'email', name: 'email' },
  { label: 'Country', type: 'text', name: 'country' },
  { label: 'Password', type: 'password', name: 'password' },
  { label: 'Confirm Password', type: 'password', name: 'confirmPassword' },
];

export default function RegisterForm({ onLogin }: Props) {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    // Simulate async registration logic
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-600">Create Account</h2>
          <p className="text-gray-600">
            Join us to track your packages easily.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {formFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                required
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          ))}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
              </div>
            )}
          </motion.button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            onClick={onLogin}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RegistrationData } from "../../types/auth";

interface Props {
  onLogin?: () => void;
  initialFormData?: Partial<RegistrationData>;
}

const RegisterForm: React.FC<Props> = ({
  onLogin = () => {},
  initialFormData = {},
}) => {
  const { register } = useAuth(); // Access the register function from AuthContext
  const [formData, setFormData] = useState<RegistrationData>({
    name: initialFormData.name || "",
    email: initialFormData.email || "",
    password: initialFormData.password || "",
    confirmPassword: initialFormData.confirmPassword || "",
    country: initialFormData.country || "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear specific field error on change
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email))
        newErrors.email = "Invalid email format";
    }

    if (!formData.country.trim()) newErrors.country = "Country is required";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(formData); // Use the register function from AuthContext
      alert(`Welcome, ${formData.name}! Your account has been created.`);
      onLogin();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        // Handle validation errors from the backend
        const backendErrors = error.response.data.errors;
        const errorMessages: { [key: string]: string } = {};
        for (const field in backendErrors) {
          errorMessages[field] = backendErrors[field];
        }
        setErrors(errorMessages);
      } else {
        alert(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-red-600">
            Create Account
          </h2>
          <p className="text-gray-600">
            Join us to track your packages easily.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {[
            { label: "Full Name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
            { label: "Country", type: "text", name: "country" },
            { label: "Password", type: "password", name: "password" },
            {
              label: "Confirm Password",
              type: "password",
              name: "confirmPassword",
            },
          ].map((field) => (
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
                className={`w-full px-4 py-2 border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
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
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            onClick={onLogin} // Ensure this works by triggering the login action
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

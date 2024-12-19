import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HistoryPage() {
  const { state, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center mb-8">
            <Package className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-8">
            LogOut
          </h1>
          {state.isAuthenticated ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">
                Welcome, {state.user?.name || state.user?.username}!
              </h2>
              
              <button
                onClick={logout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Sign in to view your package tracking history.
              </p>
              <Link
                to="/login"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

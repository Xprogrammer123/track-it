import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export default function HistoryPage() {
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
          <h1 className="text-3xl font-bold text-center mb-8">Shipping History</h1>
          <p className="text-center text-gray-600">
            Sign in to view your package tracking history.
          </p>
          <div className="mt-8 text-center">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
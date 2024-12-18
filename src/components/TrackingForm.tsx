import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import type { TrackingFormData } from '../types/tracking';

interface Props {
  onSubmit: (data: TrackingFormData) => void;
  isLoading: boolean;
}

export default function TrackingForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = React.useState<TrackingFormData>({
    trackingCode: '',
    name: '',
    country: '', // New country field
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-center mb-8">
        <Package className="w-12 h-12 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Track Your Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tracking Code
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.trackingCode}
            onChange={(e) => setFormData({ ...formData, trackingCode: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
            'Track Package'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

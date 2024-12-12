import React from 'react';
import { motion } from 'framer-motion';
import TrackingForm from '../components/TrackingForm';
import TrackingResult from '../components/TrackingResult';
import type { TrackingFormData, TrackingStatus } from '../types/tracking';
import { generateInitialStatus, updateTrackingStatus } from '../utils/tracking';

export default function TrackingPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [trackingData, setTrackingData] = React.useState<TrackingFormData | null>(null);
  const [trackingStatus, setTrackingStatus] = React.useState<TrackingStatus | null>(null);

  const handleSubmit = async (data: TrackingFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTrackingData(data);
    setTrackingStatus(generateInitialStatus());
    setIsLoading(false);
  };

  const handleReset = () => {
    setTrackingData(null);
    setTrackingStatus(null);
  };

  React.useEffect(() => {
    if (trackingStatus) {
      const interval = setInterval(() => {
        setTrackingStatus(current => current ? updateTrackingStatus(current) : null);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [trackingStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-900 mb-12"
        >
          Track Your Package
        </motion.h1>
        
        <div className="flex justify-center">
          {!trackingData ? (
            <TrackingForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : trackingStatus && (
            <TrackingResult
              trackingData={trackingData}
              status={trackingStatus}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Box, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  trackingData: TrackingFormData;
  status: TrackingStatus;
  onReset: () => void;
}

const statusIcons = {
  'processing': Package,
  'in-transit': Truck,
  'out-for-delivery': Box,
  'delivered': CheckCircle,
};

export default function TrackingResult({ trackingData, status, onReset }: Props) {
  const StatusIcon = statusIcons[status.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
    >
      <motion.div
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <img src="https://cdn.pixabay.com/photo/2014/04/02/16/19/barcode-306926_1280.png" classname="text-center mb-6"/>
        <StatusIcon className={`w-16 h-16 ${status.status === 'delivered' ? 'text-green-600' : 'text-red-600'}`} />
      </motion.div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Hello {trackingData.name}!
        </h2>
        <p className="text-gray-600 mb-4">
          Tracking Code: {trackingData.trackingCode}
        </p>
        
        {status.status === 'delivered' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-semibold"
          >
            Your package has been delivered!
          </motion.div>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-700">
              Estimated delivery in {status.daysRemaining} {status.daysRemaining === 1 ? 'day' : 'days'}
            </p>
            <p className="text-sm text-gray-500">
              Expected: {format(new Date(status.deliveryDate), 'MMMM do, yyyy')}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Status</span>
          <span className="font-semibold capitalize">{status.status.replace('-', ' ')}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Updated</span>
          <span className="font-semibold">
            {format(new Date(status.lastChecked), 'MMM d, h:mm a')}
          </span>
        </div>
      </div>

      {/* Shipper Information */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Shipper Information</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Name</span>
            <span className="font-semibold">{trackingData.shipperName || 'Default Shipper'}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Address</span>
            <p className="font-semibold text-gray-700">{trackingData.shipperAddress || '123 Default St, Default City'}</p>
          </div>
        </div>
      </div>

      {/* Receiver Information */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Receiver Information</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Name</span>
            <span className="font-semibold">{trackingData.receiverName || 'Default Receiver'}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Address</span>
            <p className="font-semibold text-gray-700">{trackingData.receiverAddress || '456 Default Blvd, Default Town'}</p>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comment</h3>
        <p className="text-sm text-gray-700">
          {trackingData.comment || 'No additional comments provided.'}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="w-full mt-8 py-3 px-6 text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Track New package
      </motion.button>
    </motion.div>
  );
}

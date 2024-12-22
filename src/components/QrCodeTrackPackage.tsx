import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Add useParams to extract route params
import axios from 'axios';
import { format } from 'date-fns';

const TrackPackage: React.FC = () => {
  const { trackingCode } = useParams(); // Extract trackingCode from URL params
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!trackingCode) return; // Ensure trackingCode exists before making the request

      try {
        const response = await axios.get(
          `https://track-it-api.vercel.app/api/packages/package/tracking/${trackingCode}`
        );
        setPackageDetails(response.data.package);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error fetching package details';
        setError(errorMessage);
      }
    };

    fetchPackageDetails();
  }, [trackingCode]);

  const formatDate = (dateString: any) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy, h:mm a');
    } catch {
      return 'Invalid date';
    }
  };

  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  if (!packageDetails) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tracking Details</h1>
      <div className="space-y-4">
        <p>
          <span className="font-semibold text-gray-700">Status:</span> {packageDetails.status}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Destination:</span> {packageDetails.destination}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Delivery Date:</span>{' '}
          {formatDate(packageDetails.delivery_date)}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Last Checked:</span>{' '}
          {formatDate(packageDetails.last_checked)}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Last Updated:</span>{' '}
          {formatDate(packageDetails.last_updated)}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Shipper Name:</span> {packageDetails.shipper_name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Shipper Address:</span>{' '}
          {packageDetails.shipper_address}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Receiver Name:</span> {packageDetails.receiver_name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Receiver Address:</span>{' '}
          {packageDetails.receiver_address}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Comment:</span> {packageDetails.comment}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Days Remaining:</span>{' '}
          {packageDetails.days_remaining}
        </p>
      </div>
    </div>
  );
};

export default TrackPackage;

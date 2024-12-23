import { useEffect, useRef } from 'react';
// import JsBarcode from 'jsbarcode';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { TrackingFormData, TrackingStatus } from '../types/tracking';
import QRCode from 'qrcode';
import { Box, CheckCircle, Package, Truck } from 'lucide-react';

interface Props {
  trackingData: TrackingFormData;
  status: TrackingStatus;
  onReset: () => void;
}


export default function TrackingResult({ trackingData, status, onReset }: Props) {
  const qrCodeCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const trackingUrl = `https://track-i.vercel.app/qr-track/${trackingData.trackingCode}`;
    if (qrCodeCanvas.current) {
      QRCode.toCanvas(qrCodeCanvas.current, trackingUrl, { width: 150 }, (error) => {
        if (error) console.error('QR Code generation error:', error);
      });
    }
  }, [trackingData.trackingCode]);

  // const barcodeRef = useRef<SVGSVGElement>(null);

  // useEffect(() => {
  //   if (barcodeRef.current) {
  //     JsBarcode(barcodeRef.current, trackingData.trackingCode, {
  //       format: 'CODE128',
  //       lineColor: '#000',
  //       width: 2,
  //       height: 100,
  //       displayValue: true,
  //     });
  //   }
  // }, [trackingData.trackingCode]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
    >
      <motion.div
        className="flex flex-col justify-center items-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <canvas ref={qrCodeCanvas} className="mb-6" />
        {/* <svg ref={barcodeRef} className="mb-6"></svg> */}
        {/* <StatusIcon className={`w-16 h-16 ${status.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`} /> */}
      </motion.div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Hello {trackingData.name}!
        </h2>
        <p className="text-gray-600 mb-4">
          Tracking Code: {trackingData.trackingCode}
        </p>
        <p className="text-gray-600 mb-4">
          Destination: {trackingData.destination}
        </p>

        {trackingData.status === 'Delivered' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-semibold"
          >
            Your package has been delivered!
          </motion.div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Expected: {format(new Date(status.deliveryDate), 'MMMM do, yyyy')}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
       <div className="flex items-center justify-between border border-gray-300 p-4 text-sm rounded-lg bg-blue-100">
  <span className="text-black font-bold text-xl">Status</span>
  <span className="text-black font-bold text-xl">
    {status.status.replace('-', ' ')}
  </span>
</div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Updated</span>
          <span className="font-semibold">
            {format(new Date(status.lastChecked), 'MMM d, h:mm a')}
          </span>
        </div>
      </div>

      {/* Shipper Information */}
      <div className="mt-6 border-dotted border-gray-200 py-6 px-12 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Shipper Information</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Name</span>
            <span className="font-semibold">{trackingData.shipperName}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Address</span>
            <p className="font-semibold text-gray-700">{trackingData.shipperAddress}</p>
          </div>
        </div>
      </div>

      {/* Receiver Information */}
      <div className="mt-6 border-dotted border-blue-100 py-6 px-12 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Receiver Information</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Name</span>
            <span className="font-semibold">{trackingData.receiverName}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Address</span>
            <p className="font-semibold text-gray-700">{trackingData.receiverAddress}</p>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comment</h3>
        <p className="text-sm text-gray-700 border-bottom-2 border-red-200 py-3">
          {trackingData.comment} 
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

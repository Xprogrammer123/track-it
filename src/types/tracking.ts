export interface TrackingFormData {
  trackingCode: string;
  name: string;
  country: string;
  email: string;
}

export interface TrackingStatus {
  status: 'processing' | 'in-transit' | 'out-for-delivery' | 'delivered';
  daysRemaining: number;
  lastChecked: string;
  deliveryDate: string;
}
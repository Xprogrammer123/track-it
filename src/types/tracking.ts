export interface TrackingFormData {
  trackingCode: string;
  name: string;
  destination: string;
  email: string;
  receiverName: any;
  receiverAddress: any;
  shipperName: any;
  shipperAddress: any;
  comment: any;
}

export interface TrackingStatus {
  status: 'processing' | 'in-transit' | 'out-for-delivery' | 'delivered';
  daysRemaining: number;
  lastChecked: string;
  deliveryDate: string;
}
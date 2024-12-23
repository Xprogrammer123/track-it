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
  status: any;
}

export interface TrackingStatus {
  status: any;
  daysRemaining: number;
  lastChecked: string;
  deliveryDate: string;
}
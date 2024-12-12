import { addDays, differenceInDays } from 'date-fns';
import type { TrackingStatus } from '../types/tracking';

export function generateInitialStatus(): TrackingStatus {
  const now = new Date();
  const deliveryDate = addDays(now, 5);
  
  return {
    status: 'processing',
    daysRemaining: 5,
    lastChecked: now.toISOString(),
    deliveryDate: deliveryDate.toISOString(),
  };
}

export function updateTrackingStatus(status: TrackingStatus): TrackingStatus {
  const now = new Date();
  const deliveryDate = new Date(status.deliveryDate);
  const daysRemaining = Math.max(0, differenceInDays(deliveryDate, now));
  
  let currentStatus: TrackingStatus['status'] = 'processing';
  if (daysRemaining === 0) {
    currentStatus = 'delivered';
  } else if (daysRemaining === 1) {
    currentStatus = 'out-for-delivery';
  } else if (daysRemaining <= 3) {
    currentStatus = 'in-transit';
  }

  return {
    ...status,
    status: currentStatus,
    daysRemaining,
    lastChecked: now.toISOString(),
  };
}
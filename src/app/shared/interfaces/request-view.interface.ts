import { ServiceRequest } from './request.interface';

export interface RequestViewModel extends ServiceRequest {
  worker?: {
    name: string;
    rating: number;
    completedJobs: number;
    image: string;
    // Added fields
    bio?: string;
    phone?: string;
    responseRate?: string;
    completionRate?: string;
    stats?: {
      totalJobs: number;
      rating: number;
      completionRate: string;
      responseRate: string;
    };
  };
  distance?: string;
  // Added fields for cost breakdown
  costs?: {
    basePrice: number;
    vat: number;
    serviceFee: number;
    discount?: number;
    total: number;
  };
  // Added fields for enhanced status tracking
  statusTimeline?: {
    createdAt: string;
    acceptedAt?: string;
    startedAt?: string;
    completedAt?: string;
    cancelledAt?: string;
  };
  // Added fields for tracking
  tracking?: {
    isActive: boolean;
    currentLocation?: {
      lat: number;
      lng: number;
    };
    estimatedArrival?: string;
  };
}

// You might also want to add these supporting interfaces
export interface CostBreakdown {
  basePrice: number;
  vat: number;
  serviceFee: number;
  discount: number;
  total: number;
}

export interface WorkerStats {
  totalJobs: number;
  rating: number;
  completionRate: string;
  responseRate: string;
}

export interface TrackingInfo {
  isActive: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  estimatedArrival?: string;
}
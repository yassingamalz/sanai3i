export interface RequestLocation {
    address: string;
    coordinates: [number, number];
  }
  
  export interface ServiceRequest {
    id?: number;
    category: string;
    service: string;
    description: string;
    location: RequestLocation;
    scheduledDate: string;
    scheduledTime: string;
    images: string[];
    estimatedCost?: number;
    paymentMethod: 'cash' | 'card';
    status: RequestStatus;
    createdAt: string;
    customerId: number;
    workerId?: number;
  }
  
  export type RequestStatus = 'draft' | 'pending' | 'accepted' | 'inProgress' | 'completed' | 'cancelled';
  export type PaymentMethod = 'cash' | 'card';
  export interface PaymentDetails {
    method: 'cash' | 'card';
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    nameOnCard?: string;
  }
  
  export interface RequestStep {
    id: number;
    title: string;
    subtitle: string;
    icon: string;
    completed: boolean;
  }

  export interface NegotiationHistory {
    id: number;
    requestId: number;
    price: number;
    message?: string;
    type: 'provider' | 'customer';
    timestamp: string;
    percentageChange: number;
  }
  
  export interface PriceUpdate {
    price: number;
    message?: string;
  }

  export interface PriceNegotiationData {
    requestId: number;
    originalPrice: number;
    serviceName: string;
  }
  
  export interface PriceNegotiationResult {
    price?: number;
    accepted: boolean;
  }
  
  export interface NegotiationOffer {
    id: number;
    price: number;
    message: string;
    type: 'provider' | 'customer';
    timestamp: Date;
    percentageChange: number;
  }
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
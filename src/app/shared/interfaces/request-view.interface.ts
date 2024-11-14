import { ServiceRequest } from './request.interface';

export interface RequestViewModel extends ServiceRequest {
  worker?: {
    name: string;
    rating: number;
    completedJobs: number;
    image: string;
  };
  distance?: string;
}
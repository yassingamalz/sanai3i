export interface Review {
    id: number;
    userName: string;
    userImage: string;
    rating: number;
    text: string;
    date: string;
    images?: string[];
    likes?: number;
    response?: {
      text: string;
      date: string;
    };
  }
  
  export interface WorkerService {
    id: number;
    name: string;
    price: number;
    description: string;
    estimatedTime?: string;
    category?: string;
    isPopular?: boolean;
  }
  
  export interface WorkerStats {
    responseRate: number;
    completionRate: number;
    onTimeRate?: number;
    totalJobs: number;
    totalReviews: number;
    avgRating: number;
  }
  
  export interface Worker {
    id: number;
    name: string;
    service: string;
    category: string;
    rating: number;
    completedJobs: number;
    image: string;
    position: [number, number];
    availability?: string;
    about?: string;
    address: string;
    responseRate: number;
    completionRate: number;
    lastOnline?: string;
    totalReviews?: number;
    services?: WorkerService[];
    reviews?: Review[];
    stats?: WorkerStats;
    badges?: string[];
    languages?: string[];
    workingHours?: {
      from: string;
      to: string;
      days: string[];
    };
    certificates?: {
      name: string;
      issuer: string;
      year: number;
    }[];
    isFavorite?: boolean;
  }
  
  export interface WorkerFilter {
    position: number | undefined;
    category?: string;
    minRating?: number;
    maxDistance?: number;
    availability?: boolean;
    priceRange?: {
      min: number;
      max: number;
    };
    sortBy?: 'rating' | 'distance' | 'completedJobs';
  }
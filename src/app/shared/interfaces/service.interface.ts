export interface MainService {
    id: number;
    name: string;
    icon: string;
    description: string;
    totalRequests?: number;
    trend?: 'up' | 'down';
    trendValue?: number;
    subServices?: SubService[];
  }
  
  export interface SubService {
    id: number;
    mainServiceId: number;
    name: string;
    description: string;
    price: number;
    estimatedTime?: string;
    icon?: string;
  }
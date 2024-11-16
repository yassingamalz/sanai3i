export interface MainService {
    category: string;
    id: number;
    name: string;
    icon: string;
    faIcon?: string; 
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
    faIcon?: string; 
  }

  export interface ServiceItem {
    id: number;
    name: string;
    price: number;
    description: string;
  }
  
  export interface ServiceSection {
    id: number;
    title: string;
    items: ServiceItem[];
  }

  export interface TrendySubService extends SubService {
    totalRequests: number;
    trend: 'up' | 'down';
    trendValue: number;
  }
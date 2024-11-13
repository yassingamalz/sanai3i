export interface ServiceType {
    id: string;
    name: string;
  }
  
  export interface ProfileFormData {
    fullName: string;
    email: string;
    serviceType?: string;
    experience?: number;
  }
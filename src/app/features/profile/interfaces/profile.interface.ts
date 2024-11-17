export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    type: 'worker' | 'customer';
    rating?: number;
    balance?: number;
    profilePicture?: string;
    addresses: Address[];
    notificationSettings: NotificationSetting[];
    languagePreference: string;
  }
  
  export interface Address {
    id: number;
    title: string;
    area: string;
    details: string;
    isDefault: boolean;
  }
  
  export interface NotificationSetting {
    id: number;
    type: string;
    enabled: boolean;
  }
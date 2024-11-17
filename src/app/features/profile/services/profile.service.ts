import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserProfile, Address } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private mockUserProfile: UserProfile = {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '01012345678',
    type: 'worker',
    rating: 4.8,
    balance: 2500,
    profilePicture: '/api/placeholder/96/96',
    addresses: [
      {
        id: 1,
        title: 'المنزل',
        area: 'المعادي',
        details: 'شارع 9، المعادي، القاهرة',
        isDefault: true
      },
      {
        id: 2,
        title: 'العمل',
        area: 'وسط البلد',
        details: 'شارع التحرير، وسط البلد، القاهرة',
        isDefault: false
      }
    ],
    notificationSettings: [
      {
        id: 1,
        type: 'orders',
        enabled: true
      },
      {
        id: 2,
        type: 'messages',
        enabled: true
      },
      {
        id: 3,
        type: 'promotions',
        enabled: false
      }
    ],
    languagePreference: 'ar'
  };

  constructor() {}

  getUserProfile(): Observable<UserProfile> {
    // Simulate API delay
    return of(this.mockUserProfile).pipe(delay(500));
  }

  updateUserProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    // Update mock data
    this.mockUserProfile = {
      ...this.mockUserProfile,
      ...profile
    };
    return of(this.mockUserProfile).pipe(delay(500));
  }

  updateProfilePicture(file: File): Observable<{ url: string }> {
    // Simulate file upload
    return of({ url: '/api/placeholder/96/96' }).pipe(delay(1000));
  }

  addAddress(address: Omit<Address, 'id'>): Observable<Address> {
    const newAddress: Address = {
      ...address,
      id: this.mockUserProfile.addresses.length + 1
    };
    this.mockUserProfile.addresses.push(newAddress);
    return of(newAddress).pipe(delay(500));
  }

  updateAddress(id: number, address: Partial<Address>): Observable<Address> {
    const index = this.mockUserProfile.addresses.findIndex(a => a.id === id);
    if (index !== -1) {
      this.mockUserProfile.addresses[index] = {
        ...this.mockUserProfile.addresses[index],
        ...address
      };
      return of(this.mockUserProfile.addresses[index]).pipe(delay(500));
    }
    return of({} as Address).pipe(delay(500));
  }

  deleteAddress(id: number): Observable<void> {
    this.mockUserProfile.addresses = this.mockUserProfile.addresses.filter(a => a.id !== id);
    return of(void 0).pipe(delay(500));
  }

  setDefaultAddress(id: number): Observable<void> {
    this.mockUserProfile.addresses = this.mockUserProfile.addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    }));
    return of(void 0).pipe(delay(500));
  }

  updateNotificationSettings(settings: { [key: string]: boolean }): Observable<void> {
    this.mockUserProfile.notificationSettings = this.mockUserProfile.notificationSettings.map(setting => ({
      ...setting,
      enabled: settings[setting.type] ?? setting.enabled
    }));
    return of(void 0).pipe(delay(500));
  }

  updateLanguage(language: string): Observable<void> {
    this.mockUserProfile.languagePreference = language;
    return of(void 0).pipe(delay(500));
  }

  // Helper method to get areas (static list)
  getAreas(): Observable<{ id: number; name: string; }[]> {
    return of([
      { id: 1, name: 'المعادي' },
      { id: 2, name: 'مدينة نصر' },
      { id: 3, name: 'المهندسين' },
      { id: 4, name: 'وسط البلد' },
      { id: 5, name: 'الدقي' },
      { id: 6, name: 'الزمالك' },
      { id: 7, name: 'حلوان' },
      { id: 8, name: 'شبرا' },
      { id: 9, name: '6 أكتوبر' },
      { id: 10, name: 'العاشر من رمضان' }
    ]).pipe(delay(300));
  }

  // Helper method to get notification types (static list)
  getNotificationTypes(): Observable<{ id: number; type: string; description: string; }[]> {
    return of([
      { 
        id: 1, 
        type: 'orders', 
        description: 'إشعارات الطلبات الجديدة والتحديثات'
      },
      { 
        id: 2, 
        type: 'messages', 
        description: 'إشعارات الرسائل والمحادثات'
      },
      { 
        id: 3, 
        type: 'promotions', 
        description: 'العروض والتحديثات الترويجية'
      },
      { 
        id: 4, 
        type: 'system', 
        description: 'إشعارات النظام والصيانة'
      }
    ]).pipe(delay(300));
  }
}
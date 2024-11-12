// services/location.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ServiceProvider {
  id: number;
  name: string;
  service: string;
  category: string;
  rating: number;
  distance: string;
  image: string;
  position: [number, number];
  jobs?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private providers: ServiceProvider[] = [
    {
      id: 1,
      name: 'عم حسن',
      service: 'كهربائي',
      category: 'electrician',
      rating: 4.9,
      distance: '0.3 كم',
      image: '/api/placeholder/80/80',
      position: [41.8781, -87.6298],
      jobs: 230
    },
    {
      id: 2,
      name: 'أستاذ محمد',
      service: 'سباك',
      category: 'plumber',
      rating: 4.8,
      distance: '0.5 كم',
      image: '/api/placeholder/80/80',
      position: [41.8785, -87.6292],
      jobs: 180
    },
    {
      id: 3,
      name: 'الحاج كريم',
      service: 'نقاش',
      category: 'painter',
      rating: 4.7,
      distance: '0.7 كم',
      image: '/api/placeholder/80/80',
      position: [41.8775, -87.6305],
      jobs: 150
    }
  ];

  private selectedProviderSubject = new BehaviorSubject<ServiceProvider | null>(null);
  selectedProvider$ = this.selectedProviderSubject.asObservable();

  getProviders(category?: string): ServiceProvider[] {
    if (!category || category === 'all') {
      return this.providers;
    }
    return this.providers.filter(provider => provider.category === category);
  }

  selectProvider(provider: ServiceProvider) {
    this.selectedProviderSubject.next(provider);
  }
}
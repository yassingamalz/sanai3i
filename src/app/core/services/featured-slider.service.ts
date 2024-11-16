import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FeaturedAd } from '../../shared/interfaces/featured-slider.interface';

@Injectable({
  providedIn: 'root'
})
export class FeaturedSliderService {
 private featuredAds: FeaturedAd[] = [
    {
      id: 1,
      title: 'AC Repair',
      subtitle: 'at home service',
      discount: '50% off',
      image: 'assets/images/featured/ac-repair.jpg',
      actionText: 'Book now',
      link: '/service/ac-repair',
    },
    {
      id: 2,
      title: 'Cleaning Service',
      subtitle: 'professional cleaning',
      discount: '30% off',
      image: 'assets/images/featured/cleaning.jpg', 
      actionText: 'Book now',
      link: '/service/cleaning',
    },
    {
      id: 3,
      title: 'Plumbing',
      subtitle: 'emergency service',
      discount: '20% off',
      image: 'assets/images/featured/plumbing.jpg',
      actionText: 'Book now',
      link: '/service/plumbing',
    }
  ];

  getFeaturedAds(): Observable<FeaturedAd[]> {
    return of(this.featuredAds);
  }

  updateFeaturedAd(id: number, ad: Partial<FeaturedAd>): Observable<FeaturedAd> {
    const index = this.featuredAds.findIndex(item => item.id === id);
    if (index !== -1) {
      this.featuredAds[index] = { ...this.featuredAds[index], ...ad };
      return of(this.featuredAds[index]);
    }
    throw new Error('Featured ad not found');
  }
}
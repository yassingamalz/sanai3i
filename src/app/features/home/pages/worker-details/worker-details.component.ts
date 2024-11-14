import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { filter, Subscription } from 'rxjs';

interface Review {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  text: string;
  date: string;
  images?: string[];
}

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface Worker {
  id: number;
  name: string;
  service: string;
  rating: number;
  jobs: number;
  image: string;
  address: string;
  services: Service[];
  lastOnline: string;
  reviews: Review[];
  totalReviews: number;
  availability: string;
  about: string;
  completionRate: number;
  responseRate: number;
}

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WorkerDetailsComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  workerId: number = 0;
  activeTab: 'services' | 'reviews' = 'services';
  isLoading = true;
  isFavorite = false;

  worker: Worker = {
    id: 1,
    name: 'عم حسن',
    service: 'كهربائي',
    rating: 4.9,
    jobs: 230,
    image: '/api/placeholder/120/120',
    address: 'المعادي، القاهرة',
    availability: 'متاح',
    about: 'خبرة ٢٠ عام في مجال الكهرباء، متخصص في صيانة وتركيب جميع الأجهزة الكهربائية',
    completionRate: 98,
    responseRate: 95,
    lastOnline: 'منذ ٥ دقائق',
    totalReviews: 180,
    services: [
      {
        id: 1,
        name: 'صيانة عامة',
        price: 150,
        description: 'فحص وإصلاح المشاكل الكهربائية العامة'
      },
      {
        id: 2,
        name: 'تركيب أجهزة',
        price: 200,
        description: 'تركيب وتوصيل الأجهزة الكهربائية'
      },
      {
        id: 3,
        name: 'تمديدات كهربائية',
        price: 300,
        description: 'تمديد وصيانة الأسلاك الكهربائية'
      }
    ],
    reviews: [
      {
        id: 1,
        userName: 'أحمد محمود',
        userImage: '/api/placeholder/48/48',
        rating: 5,
        text: 'ممتاز جداً وسريع في العمل، أنصح بالتعامل معه',
        date: 'منذ يومين',
        images: ['/api/placeholder/200/150', '/api/placeholder/200/150']
      },
      {
        id: 2,
        userName: 'محمد علي',
        userImage: '/api/placeholder/48/48',
        rating: 4.8,
        text: 'خدمة ممتازة وأسعار معقولة',
        date: 'منذ 3 أيام'
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // Subscribe to router events for scroll to top
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.scrollToTop();
    });
  }

  ngOnInit(): void {
    // Get worker ID from route params
    this.workerId = this.route.snapshot.params['id'];
    
    // Simulate API call to fetch worker details
    this.loadWorkerDetails();
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private scrollToTop() {
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.viewportScroller.scrollToPosition([0, 0]);
    }, 100);
  }

  private loadWorkerDetails() {
    this.isLoading = true;
    // Simulate API delay
    setTimeout(() => {
      // In real app, you would fetch worker data here
      this.isLoading = false;
      this.scrollToTop();
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onShare(): void {
    if (navigator.share) {
      navigator.share({
        title: this.worker.name,
        text: `${this.worker.name} - ${this.worker.service}`,
        url: window.location.href
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      this.copyToClipboard(window.location.href);
    }
  }

  private copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text)
      .then(() => {
        // You might want to show a toast or notification here
        console.log('Link copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text:', err);
      });
  }

  onAddToFavorites(): void {
    this.isFavorite = !this.isFavorite;
    // In real app, you would make an API call here
    console.log(`${this.isFavorite ? 'Added to' : 'Removed from'} favorites`);
  }

  switchTab(tab: 'services' | 'reviews'): void {
    this.activeTab = tab;
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  onContactClick(): void {
    // In real app, you would implement chat/call functionality
    console.log('Contact clicked');
  }

  onServiceSelect(service: Service): void {
    // Handle service selection
    console.log('Selected service:', service);
  }

  formatPrice(price: number): string {
    return `${price.toLocaleString('ar-EG')} جنيه`;
  }

  calculateAverageRating(): number {
    if (!this.worker.reviews.length) return 0;
    const sum = this.worker.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / this.worker.reviews.length).toFixed(1));
  }

  // Helper method to format dates (you might want to use a proper date library in production)
  formatDate(date: string): string {
    return date; // In real app, implement proper date formatting
  }

  // Method to handle image preview (you might want to implement a proper image viewer)
  onImageClick(image: string): void {
    console.log('Image clicked:', image);
  }

  // Handle loading state UI
  get loadingTemplate() {
    return this.isLoading;
  }

  // Error handling
  handleError(error: any): void {
    console.error('Error:', error);
    // Implement proper error handling
  }
}
// worker-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

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
export class WorkerDetailsComponent implements OnInit {
  workerId: number = 0;
  activeTab: 'services' | 'reviews' = 'services';
  isLoading = true;

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.workerId = this.route.snapshot.params['id'];
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
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
      });
    }
  }

  onAddToFavorites(): void {
    // Implement favorites logic
    console.log('Added to favorites');
  }

  switchTab(tab: 'services' | 'reviews'): void {
    this.activeTab = tab;
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  onContactClick(): void {
    // Implement contact logic
    console.log('Contact clicked');
  }
}
import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => in', [
        animate('0.8s ease-out')
      ])
    ])
  ]
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  services = [
    { id: 1, name: 'كهربائي', icon: '⚡', description: 'تصليح وصيانة كهرباء' },
    { id: 2, name: 'سباك', icon: '🔧', description: 'تصليح مواسير وحنفيات' },
    { id: 3, name: 'نجار', icon: '🪚', description: 'تصليح وصيانة الأثاث' },
    { id: 4, name: 'نقاش', icon: '🎨', description: 'دهانات وديكورات' },
    { id: 5, name: 'تكييف', icon: '❄️', description: 'صيانة وتركيب تكييفات' },
    { id: 6, name: 'تنظيف', icon: '🧹', description: 'خدمات النظافة المنزلية' }
  ];

  topServices = [
    { 
      id: 1, 
      name: 'تصليح تكييف', 
      count: 120, 
      trend: 'up',
      trendValue: 15 
    },
    { 
      id: 2, 
      name: 'سباكة', 
      count: 95, 
      trend: 'up',
      trendValue: 8
    },
    { 
      id: 3, 
      name: 'كهرباء', 
      count: 85, 
      trend: 'down',
      trendValue: -5
    }
  ];

  topWorkers = [
    { 
      id: 1, 
      name: 'عم حسن', 
      service: 'كهربائي', 
      rating: 4.9, 
      jobs: 230, 
      image: '/api/placeholder/64/64' 
    },
    { 
      id: 2, 
      name: 'أستاذ محمد', 
      service: 'سباك', 
      rating: 4.8, 
      jobs: 180, 
      image: '/api/placeholder/64/64' 
    }
  ];

  cardStates: { [key: number]: boolean } = {};
  isLoading = true;

  constructor(private router: Router) {
    this.services.forEach((_, index) => {
      this.cardStates[index] = false;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.setupIntersectionObserver();
    }, 100);
  }

  navigateToFullList(section: string): void {
    this.router.navigate(['/services', section]);
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          this.cardStates[index] = true;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    setTimeout(() => {
      this.serviceCards.forEach((card, index) => {
        card.nativeElement.setAttribute('data-index', index.toString());
        observer.observe(card.nativeElement);
      });
    });
  }

  shouldAnimate(index: number): boolean {
    return !this.isLoading && this.cardStates[index];
  }

  trackByServiceId(index: number, item: any): number {
    return item.id;
  }

  trackByWorkerId(index: number, item: any): number {
    return item.id;
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}
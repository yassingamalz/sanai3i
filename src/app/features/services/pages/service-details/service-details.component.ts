import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition, state, query, stagger, sequence, group } from '@angular/animations';
import { ServicesService } from '../../../../core/services/services.service';
import { MainService, ServiceSection, Worker } from '../../../../shared/interfaces/service.interface';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  animations: [
    trigger('cardWithContentAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        group([
          animate('800ms cubic-bezier(0.16, 1, 0.3, 1)', 
            style({ transform: 'translateY(0)', opacity: 1 })
          ),
          query('.content-wrapper', [
            style({ opacity: 0 }),
            animate('400ms 400ms cubic-bezier(0.16, 1, 0.3, 1)', 
              style({ opacity: 1 })
            )
          ])
        ])
      ])
    ])
  ]
})
export class ServiceDetailsComponent implements OnInit {
  service: MainService = {
    id: 0,
    name: '',
    description: '',
    icon: '',
    totalRequests: 0,
    trend: 'up',
    trendValue: 0
  };

  stats = {
    totalWorkers: 0,
    averageRating: 0,
    completedJobs: 0,
    averagePrice: 0
  };

  topWorkers: Worker[] = [
    {
      id: 1,
      name: 'أحمد محمد',
      image: '/api/placeholder/120/120',
      rating: 4.8,
      completedJobs: 156,
      service: 'كهربائي',
      responseRate: 95,
      about: 'خبرة ١٥ عام في مجال الكهرباء',
      address: 'المعادي، القاهرة'
    },
    {
      id: 2,
      name: 'محمود علي',
      image: '/api/placeholder/120/120',
      rating: 4.9,
      completedJobs: 203,
      service: 'كهربائي',
      responseRate: 98,
      about: 'متخصص في الصيانة الكهربائية',
      address: 'مدينة نصر، القاهرة'
    }
  ];

  serviceSections: ServiceSection[] = [
    {
      id: 1,
      title: 'الخدمات',
      items: [
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
      ]
    }
  ];

  suggestedServices: MainService[] = [
    {
      id: 2,
      name: 'سباكة',
      description: 'خدمات السباكة المنزلية',
      icon: 'fas fa-wrench',
      totalRequests: 850,
      trend: 'up',
      trendValue: 12
    }
    // ... more suggested services
  ];

  relatedServices: MainService[] = [];
  isLoading = true;

  constructor(
    private viewportScroller: ViewportScroller,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);
    const serviceId = Number(this.route.snapshot.params['id']);
    this.loadServiceDetails(serviceId);

  }

  private loadServiceDetails(id: number): void {
    this.isLoading = true;
    this.servicesService.getServiceById(id).subscribe({
      next: (service) => {
        if (service) {
          this.service = service;
          this.loadAdditionalData();
        }
      },
      error: (error) => {
        console.error('Error loading service:', error);
        this.isLoading = false;
      }
    });
  }

  private loadAdditionalData(): void {
    this.stats = {
      totalWorkers: 156,
      averageRating: 4.8,
      completedJobs: 1250,
      averagePrice: 180
    };

    this.relatedServices = [
      {
        id: 2,
        name: 'سباكة',
        description: 'خدمات السباكة المنزلية',
        icon: 'fas fa-wrench',
        totalRequests: 850,
        trend: 'up',
        trendValue: 12
      },
      {
        id: 3,
        name: 'نجارة',
        description: 'خدمات النجارة وإصلاح الأثاث',
        icon: 'fas fa-hammer',
        totalRequests: 650,
        trend: 'up',
        trendValue: 8
      }
    ];

    this.isLoading = false;
  }

  onWorkerClick(workerId: number): void {
    this.router.navigate(['/workers', workerId]);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  onRequestService(): void {
    console.log('Service requested');
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition, state, query, stagger, sequence, group } from '@angular/animations';
import { ServicesService } from '../../../../core/services/services.service';
import { MainService, ServiceSection } from '../../../../shared/interfaces/service.interface';
import { ViewportScroller } from '@angular/common';
import { finalize, forkJoin, Observable, of } from 'rxjs';
import { WorkerService } from '../../../../core/services/worker.service';
import { Worker } from '../../../../shared/interfaces/worker.interface';

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
    trendValue: 0,
    category: ''
  };
  stats = {
    totalWorkers: 0,
    averageRating: 0,
    completedJobs: 0,
    averagePrice: 0
  };
  topWorkers: Worker[] = [];
  serviceSections: ServiceSection[] = [];
  suggestedServices: MainService[] = [];
  relatedServices: MainService[] = [];
  isLoading = true;

  constructor(
    private viewportScroller: ViewportScroller,
    private servicesService: ServicesService,
    private workerService: WorkerService, 
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);
    const serviceId = Number(this.route.snapshot.params['id']);
    this.loadData(serviceId);
  }

  private loadData(serviceId: number): void {
    this.isLoading = true;

    const serviceSections: ServiceSection[] = [
      {
        id: 1,
        title: 'الخدمات',
        items: [
          { id: 1, name: 'صيانة عامة', price: 150, description: 'فحص وإصلاح المشاكل الكهربائية العامة' },
          { id: 2, name: 'تركيب أجهزة', price: 200, description: 'تركيب وتوصيل الأجهزة الكهربائية' },
          { id: 3, name: 'تمديدات كهربائية', price: 300, description: 'تمديد وصيانة الأسلاك الكهربائية' }
        ]
      }
    ];

    // Get service details and workers in parallel
    forkJoin({
      service: this.servicesService.getServiceById(serviceId),
      workers: this.workerService.getWorkers() 
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: ({ service, workers }) => {
        if (service) {
          this.service = service;
          this.serviceSections = serviceSections;
          
          // Get 2 random workers
          this.topWorkers = this.getRandomWorkers(workers, 2);
          
          this.updateStats(this.topWorkers);
          this.loadRelatedServices();
        }
      },
      error: (error) => console.error('Error loading data:', error)
    });
}

private getRandomWorkers(workers: Worker[], count: number): Worker[] {
    return [...workers]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
}

  private loadRelatedServices(): void {
    this.relatedServices = [
      {
        id: 2,
        name: 'سباكة',
        description: 'خدمات السباكة المنزلية',
        icon: 'fas fa-wrench',
        totalRequests: 850,
        trend: 'up',
        trendValue: 12,
        category: ''
      },
      {
        id: 3,
        name: 'نجارة',
        description: 'خدمات النجارة وإصلاح الأثاث',
        icon: 'fas fa-hammer',
        totalRequests: 650,
        trend: 'up',
        trendValue: 8,
        category: ''
      }
    ];
  }

  private updateStats(workers: Worker[]): void {
    this.stats = {
      totalWorkers: workers.length,
      averageRating: Number((workers.reduce((acc, w) => acc + w.rating, 0) / workers.length).toFixed(2)),
      completedJobs: workers.reduce((acc, w) => acc + w.completedJobs, 0),
      averagePrice: Number(180.00.toFixed(2))
    };
  }

  onWorkerClick(workerId: number): void {
    this.router.navigate(['/worker', workerId]);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  onRequestService(): void {
    console.log('Service requested');
  }
}
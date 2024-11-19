import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition, group, query } from '@angular/animations';
import { ServicesService } from '../../../../core/services/services.service';
import { MainService, ServiceSection } from '../../../../shared/interfaces/service.interface';
import { ViewportScroller } from '@angular/common';
import { finalize, forkJoin } from 'rxjs';
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
  relatedServices: MainService[] = [];
  isLoading = true;

  constructor(
    private viewportScroller: ViewportScroller,
    private servicesService: ServicesService,
    private workerService: WorkerService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const serviceId = Number(params['id']);
      this.loadData(serviceId);
      window.scrollTo(0, 0);
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  onWorkerClick(workerId: number): void {
    this.router.navigate(['/worker', workerId]);
  }

  onSubServiceClick(subService: any): void {
    this.router.navigate(['/services', this.service.id, 'sub-service', subService.id]);
  }

  onRelatedServiceClick(id: number): void {
    this.clearService();
    this.router.navigate(['services', id], {
      skipLocationChange: false,
      replaceUrl: true
    });
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  onRequestService(): void {
    console.log('Service requested');
  }

  private clearService(): void {
    this.service = {
      id: 0,
      name: '',
      description: '',
      icon: '',
      totalRequests: 0,
      trend: 'up',
      trendValue: 0,
      category: ''
    };
    this.stats = {
      totalWorkers: 0,
      averageRating: 0,
      completedJobs: 0,
      averagePrice: 0
    };
    this.topWorkers = [];
    this.serviceSections = [];
    this.relatedServices = [];
  }

  private loadData(serviceId: number): void {
    this.isLoading = true;
    this.clearService();

    forkJoin({
      service: this.servicesService.getServiceById(serviceId),
      subServices: this.servicesService.getSubServices(serviceId),
      workers: this.workerService.getWorkers(),
      relatedServices: this.servicesService.getRelatedServices(serviceId)
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: ({ service, subServices, workers, relatedServices }) => {
        if (service) {
          this.service = service;
          this.serviceSections = [{
            id: 1,
            title: 'الخدمات',
            items: subServices
          }];
          this.topWorkers = this.getRandomWorkers(workers, 4);
          this.relatedServices = relatedServices;
          this.updateStats(this.topWorkers);
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

  private updateStats(workers: Worker[]): void {
    this.stats = {
      totalWorkers: workers.length,
      averageRating: Number((workers.reduce((acc, w) => acc + w.rating, 0) / workers.length).toFixed(2)),
      completedJobs: workers.reduce((acc, w) => acc + w.completedJobs, 0),
      averagePrice: Number(180.00.toFixed(2))
    };
  }
}
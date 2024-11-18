import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { WorkerService } from '../../../../core/services/worker.service';
import { ServicesService } from '../../../../core/services/services.service';
import { Worker } from '../../../../shared/interfaces/worker.interface';
import { MainService, TrendySubService } from '../../../../shared/interfaces/service.interface';

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
        animate('0.8s 0.3s ease-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  // Data properties
  services: MainService[] = [];
  topSubServices: TrendySubService[] = [];
  topWorkers: Worker[] = [];
  mainServicesMap: Map<number, MainService> = new Map();
  
  // UI State properties
  cardStates: { [key: number]: boolean } = {};
  isLoading = true;
  errorMessage: string | null = null;
  
  // Cleanup
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private workerService: WorkerService,
    private servicesService: ServicesService
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const services$ = this.servicesService.getAllServices();
    const workers$ = this.workerService.getTopWorkers(3);

    forkJoin({
      services: services$,
      workers: workers$
    }).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        setTimeout(() => {
          this.isLoading = false;
          this.initializeAnimations();
        }, 300);
      })
    ).subscribe({
      next: ({ services, workers }) => {
        this.services = services;
        this.topWorkers = workers;
        this.processTrendySubServices(services);
        this.services.forEach((_, index) => {
          this.cardStates[index] = false;
        });
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.';
        this.isLoading = false;
      }
    });
  }

  private processTrendySubServices(services: MainService[]): void {
    const allSubServices: TrendySubService[] = [];
    
    services.forEach(service => {
      this.mainServicesMap.set(service.id, service);
      
      const { totalRequests, trend, trendValue } = service;
      
      service.subServices?.forEach(subService => {
        if (totalRequests && trend && trendValue) {
          allSubServices.push({
            ...subService,
            totalRequests,
            trend,
            trendValue
          });
        }
      });
    });

    this.topSubServices = allSubServices
      .sort((a, b) => b.totalRequests - a.totalRequests)
      .slice(0, 3);
  }

  private initializeAnimations(): void {
    if (this.services.length) {
      this.services.forEach((_, index) => {
        setTimeout(() => {
          this.cardStates[index] = true;
        }, index * 100);
      });
    }
  }

  handleServiceClick(serviceId: number): void {
    if (serviceId === -1) {
      this.router.navigate(['/services', 'all-services']);
    } else {
      this.router.navigate(['/services', serviceId]);
    }
  }
}
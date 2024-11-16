import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnInit, OnDestroy, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { WorkerService } from '../../../../core/services/worker.service';
import { ServicesService } from '../../../../core/services/services.service';
import { Worker } from '../../../../shared/interfaces/worker.interface';
import { MainService } from '../../../../shared/interfaces/service.interface';

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

  // Search related properties
  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  
  // Data properties
  services: MainService[] = [];
  topServices: MainService[] = [];
  topWorkers: Worker[] = [];
  
  // UI State properties
  cardStates: { [key: number]: boolean } = {};
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private workerService: WorkerService,
    private servicesService: ServicesService
  ) {
    this.setupSearchSubscription();
  }

  ngOnInit() {
    this.loadInitialData();
  }

  ngAfterViewInit() {
    // Initialize animation states after a brief delay
    setTimeout(() => {
      this.initializeAnimations();
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Data Loading Methods
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
        this.topServices = [...services]
          .sort((a, b) => (b.totalRequests || 0) - (a.totalRequests || 0))
          .slice(0, 3);
        
        // Initialize card states
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

  // Animation Methods
  private initializeAnimations(): void {
    if (this.services.length) {
      this.services.forEach((_, index) => {
        setTimeout(() => {
          this.cardStates[index] = true;
        }, index * 100); // Stagger the animations
      });
    }
  }

  shouldAnimate(index: number): boolean {
    return !this.isLoading && this.cardStates[index];
  }

  // Search Methods
  private setupSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.searchSubject.next(this.searchQuery);
  }

  private performSearch(query: string): void {
    if (query.trim()) {
      this.servicesService.searchServices(query)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (results) => {
            console.log('Search results:', results);
            // Handle search results as needed
          },
          error: (error) => {
            console.error('Search error:', error);
          }
        });
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchSubject.next('');
  }

  // Navigation Methods
  navigateToFullList(section: string): void {
    this.router.navigate(['/services', section]);
  }

  openService(id: number): void {
    this.router.navigate(['/services', id]);
  }

  onWorkerClick(worker: Worker): void {
    this.router.navigate(['/worker', worker.id]);
  }

  // Error Handling
  retryLoading(): void {
    this.loadInitialData();
  }

  // Tracking Methods
  trackByServiceId: TrackByFunction<MainService> = (index: number, item: MainService) => item.id;
  
  trackByWorkerId: TrackByFunction<Worker> = (index: number, item: Worker) => item.id;

  // Helper Methods
  getTotalRequests(): number {
    return this.topServices.reduce((total, service) => total + (service.totalRequests || 0), 0);
  }

  hasSearchResults(): boolean {
    return this.searchQuery.trim().length > 0 && this.services.length > 0;
  }

  getServiceIcon(service: MainService): string {
    return service.faIcon || service.icon;
  }

  // UI Helper Methods
  isTrendingUp(service: MainService): boolean {
    return service.trend === 'up';
  }

  getTrendClass(service: MainService): string {
    return service.trend === 'up' ? 'text-success' : 'text-danger';
  }

  // Additional Methods for Home UI
  getServiceRowClass(index: number): string {
    return index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
  }

  getDisplayedServices(): MainService[] {
    return this.services.slice(0, 6); // Show first 6 services only
  }

  getServiceProgress(service: MainService): number {
    const maxRequests = Math.max(...this.topServices.map(s => s.totalRequests || 0));
    return ((service.totalRequests || 0) / maxRequests) * 100;
  }
}
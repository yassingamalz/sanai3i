import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnInit, OnDestroy, TrackByFunction, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { WorkerService } from '../../../../core/services/worker.service';
import { ServicesService } from '../../../../core/services/services.service';
import { Worker } from '../../../../shared/interfaces/worker.interface';
import { MainService, SubService, TrendySubService } from '../../../../shared/interfaces/service.interface';

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
  searchResults: SubService[] = [];
  isSearching: boolean = false;
  showResults: boolean = false;
  selectedResultIndex: number = -1;
  private searchSubject = new Subject<string>();
  private searchCache: Map<string, SubService[]> = new Map();

  // Data properties
  services: MainService[] = [];
  topSubServices: TrendySubService[] = [];
  topWorkers: Worker[] = [];
  private mainServicesMap: Map<number, MainService> = new Map();
  
  // UI State properties
  cardStates: { [key: number]: boolean } = {};
  isLoading = true;
  errorMessage: string | null = null;
  
  // Cleanup
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private workerService: WorkerService,
    private servicesService: ServicesService,
    private elementRef: ElementRef
  ) {
    this.setupSearchSubscription();
  }

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

  // Click outside handler
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showResults = false;
      this.selectedResultIndex = -1;
    }
  }

  // Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    if (!this.showResults) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedResultIndex = Math.min(
          this.selectedResultIndex + 1,
          this.searchResults.length - 1
        );
        this.scrollToSelectedResult();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.selectedResultIndex = Math.max(this.selectedResultIndex - 1, -1);
        this.scrollToSelectedResult();
        break;

      case 'Enter':
        if (this.selectedResultIndex >= 0 && this.searchResults[this.selectedResultIndex]) {
          const result = this.searchResults[this.selectedResultIndex];
          this.navigateToSubService(result.mainServiceId, result.id);
        }
        break;

      case 'Escape':
        this.showResults = false;
        this.selectedResultIndex = -1;
        break;
    }
  }

  private scrollToSelectedResult() {
    if (this.selectedResultIndex >= 0) {
      const resultElements = document.querySelectorAll('.search-result-item');
      const selectedElement = resultElements[this.selectedResultIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
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
        
        // Initialize mainServicesMap and process trendy subservices
        this.processTrendySubServices(services);
        
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

  private processTrendySubServices(services: MainService[]): void {
    const allSubServices: TrendySubService[] = [];
    
    // Build mainServicesMap and collect subservices
    services.forEach(service => {
      this.mainServicesMap.set(service.id, service);
      
      // Get trendy data from main service
      const { totalRequests, trend, trendValue } = service;
      
      service.subServices?.forEach(subService => {
        // Add as trendy subservice using parent service's trend data
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

    // Sort by totalRequests and get top 3
    this.topSubServices = allSubServices
      .sort((a, b) => b.totalRequests - a.totalRequests)
      .slice(0, 3);
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
    this.selectedResultIndex = -1;
    
    if (this.searchQuery.trim()) {
      this.showResults = true;
      this.searchSubject.next(this.searchQuery);
    } else {
      this.searchResults = [];
      this.showResults = false;
    }
  }

  private performSearch(query: string): void {
    if (!query.trim()) {
      this.searchResults = [];
      this.isSearching = false;
      return;
    }

    const cachedResults = this.searchCache.get(query);
    if (cachedResults) {
      this.searchResults = cachedResults;
      return;
    }

    this.isSearching = true;
    const searchLower = query.toLowerCase();

    // Search through existing services first
    let results: SubService[] = [];
    this.services.forEach(service => {
      service.subServices?.forEach(subService => {
        if (this.matchesSearch(subService, searchLower)) {
          results.push(subService);
        }
      });
    });

    // If we have local results, use them
    if (results.length > 0) {
      this.searchResults = results;
      this.searchCache.set(query, results);
      this.isSearching = false;
      return;
    }

    // Otherwise, make the API call
    this.servicesService.searchServices(query)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSearching = false;
        })
      )
      .subscribe({
        next: (services) => {
          results = services.flatMap(service => 
            (service.subServices || []).filter(subService =>
              this.matchesSearch(subService, searchLower)
            )
          );
          this.searchResults = results;
          this.searchCache.set(query, results);
        },
        error: (error) => {
          console.error('Search error:', error);
          this.searchResults = [];
        }
      });
  }

  private matchesSearch(subService: SubService, searchLower: string): boolean {
    return (
      subService.name.toLowerCase().includes(searchLower) ||
      subService.description.toLowerCase().includes(searchLower)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.showResults = false;
    this.selectedResultIndex = -1;
  }

  // Animation Methods
  private initializeAnimations(): void {
    if (this.services.length) {
      this.services.forEach((_, index) => {
        setTimeout(() => {
          this.cardStates[index] = true;
        }, index * 100);
      });
    }
  }

  shouldAnimate(index: number): boolean {
    return !this.isLoading && this.cardStates[index];
  }

  // Navigation Methods
  navigateToFullList(section: string): void {
    this.router.navigate(['/services', section]);
  }

  openService(id: number): void {
    this.router.navigate(['/services', id]);
  }

  navigateToSubService(mainServiceId: number, subServiceId: number): void {
    this.router.navigate(['/services', mainServiceId, 'sub-service', subServiceId]);
    this.showResults = false;
    this.clearSearch();
  }

  onWorkerClick(worker: Worker): void {
    this.router.navigate(['/worker', worker.id]);
  }

  // Helper Methods
  getMainService(mainServiceId: number): MainService | undefined {
    return this.mainServicesMap.get(mainServiceId);
  }

  // Tracking Methods
  trackByServiceId: TrackByFunction<MainService> = (index: number, item: MainService) => item.id;
  
  trackByWorkerId: TrackByFunction<Worker> = (index: number, item: Worker) => item.id;
  
  trackBySubServiceId: TrackByFunction<TrendySubService> = 
    (index: number, item: TrendySubService) => `${item.mainServiceId}-${item.id}`;

  trackBySearchResult: TrackByFunction<SubService> = (index: number, item: SubService) => 
    `${item.mainServiceId}-${item.id}`;
}
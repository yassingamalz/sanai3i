import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnInit, OnDestroy, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WorkerService } from '../../../../core/services/worker.service';
import { Worker } from '../../../../shared/interfaces/worker.interface';

interface Service {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface TopService {
  id: number;
  name: string;
  count: number;
  trend: 'up' | 'down';
  trendValue: number;
}

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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  
  services: Service[] = [
    { id: 1, name: 'كهربائي', icon: '⚡', description: 'تصليح وصيانة كهرباء' },
    { id: 2, name: 'سباك', icon: '🔧', description: 'تصليح مواسير وحنفيات' },
    { id: 3, name: 'نجار', icon: '🪚', description: 'تصليح وصيانة الأثاث' },
    { id: 4, name: 'نقاش', icon: '🎨', description: 'دهانات وديكورات' },
    { id: 5, name: 'تكييف', icon: '❄️', description: 'صيانة وتركيب تكييفات' },
    { id: 6, name: 'تنظيف', icon: '🧹', description: 'خدمات النظافة المنزلية' }
  ];

  topServices: TopService[] = [
    { id: 1, name: 'تصليح تكييف', count: 120, trend: 'up', trendValue: 15 },
    { id: 2, name: 'سباكة', count: 95, trend: 'up', trendValue: 8 },
    { id: 3, name: 'كهرباء', count: 85, trend: 'down', trendValue: -5 }
  ];

  topWorkers: Worker[] = [];
  cardStates: { [key: number]: boolean } = {};
  isLoading = true;

  constructor(
    private router: Router,
    private workerService: WorkerService
  ) {
    this.initializeCardStates();
    this.setupSearchSubscription();
  }

  ngOnInit() {
    this.loadTopWorkers();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.setupIntersectionObserver();
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Search handling
  private setupSearchSubscription() {
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

  private performSearch(query: string) {
    if (query.trim()) {
      this.workerService.searchWorkers(query)
        .pipe(takeUntil(this.destroy$))
        .subscribe(workers => {
          // Handle search results
          console.log('Search results:', workers);
        });
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchSubject.next('');
  }

  // Worker data loading
  private loadTopWorkers() {
    this.workerService.getTopWorkers(3)
      .pipe(takeUntil(this.destroy$))
      .subscribe(workers => {
        this.topWorkers = workers;
      });
  }

  // Navigation
  navigateToFullList(section: string): void {
    this.router.navigate(['/services', section]);
  }

  onWorkerClick(worker: Worker): void {
    this.router.navigate(['/worker', worker.id]);
  }

  // Animation and intersection observer
  private initializeCardStates() {
    this.services.forEach((_, index) => {
      this.cardStates[index] = false;
    });
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

  // Tracking
  trackByServiceId: TrackByFunction<Service> = (index: number, item: Service) => item.id;
  
  trackByTopServiceId: TrackByFunction<TopService> = (index: number, item: TopService) => item.id;
  
  trackByWorkerId: TrackByFunction<Worker> = (index: number, item: Worker) => item.id;
}
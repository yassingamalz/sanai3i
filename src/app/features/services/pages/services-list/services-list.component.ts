import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { debounceTime, Subject } from 'rxjs';
import { ServicesService } from '../../../../core/services/services.service';
import { MainService } from '../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ 
            opacity: 0,
            transform: 'translateY(20px)'
          }),
          stagger(50, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', 
              style({ 
                opacity: 1,
                transform: 'translateY(0)'
              })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ServicesListComponent implements OnInit, OnDestroy {
  services: MainService[] = [];
  filteredServices: MainService[] = [];
  displayedServices: MainService[] = [];
  isLoading = true;
  searchQuery = '';
  private searchSubject = new Subject<string>();

  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) {
    this.setupSearch();
  }

  ngOnInit(): void {
    this.loadServices();
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => {
      this.filterServices(query);
    });
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }

  private filterServices(query: string): void {
    this.displayedServices = []; // Clear the display array
    
    requestAnimationFrame(() => {
      if (!query.trim()) {
        this.filteredServices = [...this.services];
      } else {
        const searchTerm = query.toLowerCase().trim();
        this.filteredServices = [...this.services].filter(service => 
          service.name.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm)
        );
      }
      
      requestAnimationFrame(() => {
        this.displayedServices = [...this.filteredServices];
      });
    });
  }

  private loadServices(): void {
    this.isLoading = true;
    this.servicesService.getAllServices()
      .subscribe({
        next: (services) => {
          this.services = services;
          this.filteredServices = services;
          this.isLoading = false;
          
          requestAnimationFrame(() => {
            this.displayedServices = [...services];
          });
        },
        error: (error) => {
          console.error('Error loading services:', error);
          this.isLoading = false;
        }
      });
  }

  onServiceClick(serviceId: number): void {
    this.router.navigate(['/services', serviceId]);
  }

  trackByServiceId(index: number, service: MainService): number {
    return service.id;
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }
}
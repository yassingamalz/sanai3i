// services-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../../../core/services/services.service';
import { MainService } from '../../../../shared/interfaces/service.interface';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  services: MainService[] = [];
  displayedServices: MainService[] = [];
  isLoading = true;
  searchQuery = '';

  constructor(
    private viewportScroller: ViewportScroller,
    private servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);
    this.loadServices();
  }

  onSearch(query: string): void {
    this.filterServices(query);
  }

  private filterServices(query: string): void {
    if (!query.trim()) {
      this.displayedServices = [...this.services];
    } else {
      const searchTerm = query.toLowerCase().trim();
      this.displayedServices = this.services.filter(service =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
      );
    }
  }

  private loadServices(): void {
    this.isLoading = true;
    this.servicesService.getAllServices()
      .subscribe({
        next: (services) => {
          this.services = services;
          this.displayedServices = services;
          this.isLoading = false;
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
}
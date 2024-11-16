import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { icon, latLng, marker, tileLayer, Map, Layer, Icon } from 'leaflet';
import { WorkerService } from '../../../../core/services/worker.service';
import { ServicesService } from '../../../../core/services/services.service';
import { MainService } from '../../../../shared/interfaces/service.interface';
import { Worker } from '../../../../shared/interfaces/worker.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { GeocodingService } from '../../../../core/services/geocoding.service';

// Interfaces
interface Category {
  id: string;
  name: string;
  icon: string;
  totalRequests?: number;
}

interface AddressResult {
  mainText: string;
  subText: string;
  location: [number, number];
  type: 'recent' | 'result';
}

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ]),
    trigger('swipeAnimation', [
      transition(':enter', [
        style({ transform: '{{startTransform}}', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class DiscoverComponent implements OnInit, OnDestroy, AfterViewInit {
  // RxJS
  private destroy$ = new Subject<void>();
  searchControl = new FormControl('');

  // State Management
  addressResults: AddressResult[] = [];
  showAddressResults = false;
  categories: Category[] = [];
  providers: Worker[] = [];
  selectedCategory = 'all';
  selectedProvider: Worker | null = null;
  currentPosition: [number, number] = [30.0444, 31.2357];
  currentAddress = 'القاهرة، المعادي';
  isLoadingLocation = false;

  // Touch Handling
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchEndX: number = 0;
  private touchEndY: number = 0;
  private swipeThreshold: number = 50;
  swipeDirection: 'left' | 'right' | null = null;

  // Map Configuration
  map: Map | null = null;
  markers: Layer[] = [];
  
  options = {
    layers: [GeocodingService.createFastTileLayer()],
    zoom: 17,
    center: latLng(30.0444, 31.2357),
    zoomControl: false
  };

  mapContainer: HTMLElement | null = null;

  // Map Icons
  private readonly currentLocationIcon: Icon = icon({
    iconUrl: '/sanai3i/assets/map/current-location-marker.svg',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    className: 'current-location-marker'
  });

  private readonly providerIcon: Icon = icon({
    iconUrl: '/sanai3i/assets/map/provider-marker.svg',
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'provider-marker'
  });

  constructor(
    private http: HttpClient,
    private geocodingService: GeocodingService,
    private workerService: WorkerService,
    private servicesService: ServicesService,
    private router: Router
  ) {
  }

  // Lifecycle Hooks
  ngOnInit() {
    this.initializeCategories();
    this.setupSearchListener();
    this.initializeGeolocation();
    this.loadInitialData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
        this.updateMarkers();
      }
    }, 100);
  }

  ngOnDestroy() {
    this.cleanup();
  }

  // Initialization Methods
  private initializeCategories() {
    this.servicesService.getAllServices()
      .pipe(takeUntil(this.destroy$))
      .subscribe(services => {
        this.categories = [
          { id: 'all', name: 'الكل', icon: '🔍' },
          ...services.map(service => ({
            id: service.category,
            name: service.name,
            icon: service.icon,
            totalRequests: service.totalRequests
          }))
        ];
      });
  }

  private setupSearchListener() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap(query => {
        if (!query) {
          this.addressResults = [];
          this.showAddressResults = false;
          return EMPTY;
        }

        return this.geocodingService.searchAddress(query).pipe(
          map(results => {
            const recentSearches: AddressResult[] = [{
              mainText: 'آخر بحث',
              subText: 'القاهرة، المعادي',
              location: [30.0444, 31.2357],
              type: 'recent'
            }];

            const apiResults: AddressResult[] = results.map(result => ({
              mainText: result.mainText,
              subText: result.subText,
              location: result.location,
              type: 'result'
            }));

            this.addressResults = [...recentSearches, ...apiResults];
            this.showAddressResults = true;
          })
        );
      })
    ).subscribe();
  }

  async getCurrentLocation() {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    this.isLoadingLocation = true;

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      this.currentPosition = [position.coords.latitude, position.coords.longitude];

      this.geocodingService.reverseGeocode(this.currentPosition[0], this.currentPosition[1])
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.isLoadingLocation = false)
        )
        .subscribe(address => {
          this.currentAddress = address;
          this.searchControl.setValue(address, { emitEvent: false });
        });

      if (this.map) {
        this.map.setView(latLng(this.currentPosition[0], this.currentPosition[1]), 15);
        this.updateMarkers();
      }
    } catch (error) {
      console.error('Error getting location:', error);
      this.isLoadingLocation = false;
    }
  }

  private initializeGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentPosition = [position.coords.latitude, position.coords.longitude];
          if (this.map) {
            this.map.setView(latLng(this.currentPosition[0], this.currentPosition[1]), 15);
            this.updateMarkers();
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }

  private loadInitialData() {
    const request$ = this.selectedCategory === 'all'
      ? this.workerService.getWorkers()
      : this.workerService.getWorkersByCategory(this.selectedCategory);

    request$.pipe(takeUntil(this.destroy$))
      .subscribe(workers => {
        this.providers = workers;
        this.updateMarkers();
      });
  }

  // Map Event Handlers
  onMapReady(map: Map) {
    if (this.map) return;

    this.map = map;
    this.setupMapEventListeners();
    this.updateMarkers();
  }

  private setupMapEventListeners() {
    window.addEventListener('resize', () => {
      if (this.map) {
        setTimeout(() => this.map?.invalidateSize(), 100);
      }
    });

    this.map?.on('click', () => this.clearSelectedProvider());
  }

  // Touch Event Handlers
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.touchStartX || !this.touchStartY) return;

    this.touchEndX = event.touches[0].clientX;
    this.touchEndY = event.touches[0].clientY;

    // Calculate vertical and horizontal difference
    const diffX = this.touchStartX - this.touchEndX;
    const diffY = this.touchStartY - this.touchEndY;

    // If horizontal swipe is greater than vertical and meets threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > this.swipeThreshold) {
      this.swipeDirection = diffX > 0 ? 'left' : 'right';
    }
  }

  onTouchEnd() {
    if (this.swipeDirection === 'left') {
      this.showNextProvider();
    } else if (this.swipeDirection === 'right') {
      this.showPreviousProvider();
    }

    // Reset values
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.swipeDirection = null;
  }

  // Provider Navigation
  showNextProvider() {
    if (!this.selectedProvider) return;

    const currentIndex = this.providers.findIndex(p => p.id === this.selectedProvider?.id);
    if (currentIndex < this.providers.length - 1) {
      this.selectProvider(this.providers[currentIndex + 1], 'left');
    }
  }

  showPreviousProvider() {
    if (!this.selectedProvider) return;

    const currentIndex = this.providers.findIndex(p => p.id === this.selectedProvider?.id);
    if (currentIndex > 0) {
      this.selectProvider(this.providers[currentIndex - 1], 'right');
    }
  }

  // Marker Management
  private updateMarkers() {
    if (!this.map) return;

    // Clear existing markers
    this.markers.forEach(marker => marker.removeFrom(this.map!));
    this.markers = [];

    // Add current location marker
    const currentLocationMarker = marker(this.currentPosition, {
      icon: this.currentLocationIcon
    }).bindPopup('موقعك الحالي');

    this.markers.push(currentLocationMarker);
    currentLocationMarker.addTo(this.map);

    // Add provider markers
    this.providers.forEach(provider => {
      if (!provider.position) return;

      const providerMarker = marker(provider.position, { icon: this.providerIcon })
        .on('click', () => this.selectProvider(provider));

      this.markers.push(providerMarker);
      providerMarker.addTo(this.map!);
    });
  }

  // Provider Selection
  selectProvider(provider: Worker, direction: 'left' | 'right' = 'left') {
    this.selectedProvider = provider;
    if (this.map && provider.position) {
      this.map.setView(provider.position, this.map.getZoom() || 15);
      this.updateCardPointer(provider);
    }
  }

  private updateCardPointer(provider: Worker) {
    if (!this.map || !provider.position) return;

    const marker = this.markers.find(m => {
      const markerLatLng = (m as any).getLatLng();
      return markerLatLng.lat === provider.position[0] && markerLatLng.lng === provider.position[1];
    });

    if (marker) {
      const point = this.map.latLngToContainerPoint((marker as any).getLatLng());
      const card = document.querySelector('.provider-card');
      if (card) {
        const triangle = card.querySelector('::before') as HTMLElement;
        if (triangle) {
          triangle.style.left = `${point.x}px`;
        }
      }
    }
  }

  clearSelectedProvider() {
    this.selectedProvider = null;
  }

  // Navigation
  navigateToWorkerProfile(workerId: number) {
    this.router.navigate(['/worker', workerId]);
  }

  // Service Request
  requestService(worker: Worker) {
    // Implement service request logic
    console.log('Requesting service from:', worker);
  }

  // Search Related Methods
  selectAddress(address: AddressResult) {
    this.currentAddress = address.mainText;
    this.currentPosition = address.location;
    this.searchControl.setValue(address.mainText, { emitEvent: false });
    this.showAddressResults = false;

    if (this.map) {
      this.map.setView(latLng(address.location[0], address.location[1]), 15);
      this.updateMarkers();
    }

    this.storeRecentSearch(address);
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.showAddressResults = false;
    this.addressResults = [];
  }

  // Category Selection
  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.selectedProvider = null;
    this.loadInitialData();
  }

  // Utility Methods
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance < 1
      ? `${Math.round(distance * 1000)} م`
      : `${distance.toFixed(1)} كم`;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  getProviderDistance(provider: Worker): string {
    if (!provider.position) return '0 كم';

    return this.calculateDistance(
      this.currentPosition[0],
      this.currentPosition[1],
      provider.position[0],
      provider.position[1]
    );
  }

  private storeRecentSearch(address: AddressResult) {
    try {
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const newSearch: AddressResult = {
        mainText: address.mainText,
        subText: address.subText,
        location: address.location,
        type: 'recent'
      };

      const updatedSearches = [
        newSearch,
        ...recentSearches
          .filter((s: AddressResult) => s.mainText !== address.mainText)
      ].slice(0, 5);

      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error storing recent search:', error);
    }
  }

  // Event Listeners
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const searchContainer = document.querySelector('.search-section');
    if (searchContainer && !searchContainer.contains(event.target as Node)) {
      this.showAddressResults = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.selectedProvider) return;

    switch (event.key) {
      case 'ArrowLeft':
        this.showNextProvider();
        break;
      case 'ArrowRight':
        this.showPreviousProvider();
        break;
      case 'Escape':
        this.clearSelectedProvider();
        break;
    }
  }

  // Animation Methods
  getSwipeAnimation(direction: 'left' | 'right') {
    return {
      params: {
        startTransform: direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)'
      }
    };
  }

  // Helper Methods
  isProviderSelected(provider: Worker): boolean {
    return this.selectedProvider?.id === provider.id;
  }

  getCurrentProviderIndex(): number {
    if (!this.selectedProvider) return -1;
    return this.providers.findIndex(p => p.id === this.selectedProvider?.id);
  }

  hasNextProvider(): boolean {
    const currentIndex = this.getCurrentProviderIndex();
    return currentIndex < this.providers.length - 1;
  }

  hasPreviousProvider(): boolean {
    const currentIndex = this.getCurrentProviderIndex();
    return currentIndex > 0;
  }

  getProviderStatusClass(provider: Worker): string {
    if (!provider.availability) return '';
    return `status-${provider.availability.toLowerCase()}`;
  }

  // Cleanup
  private cleanup() {
    try {
      // Clean up markers
      this.markers.forEach(marker => marker?.remove());
      this.markers = [];

      // Remove event listeners
      window.removeEventListener('resize', () => { });

      // Clean up map
      if (this.map) {
        this.map.off();
        this.map.remove();
        this.mapContainer = document.querySelector('.leaflet-container');
        this.mapContainer?.remove();
      }

      // Clean up observables
      this.destroy$.next();
      this.destroy$.complete();
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  // Error Handling
  private handleError(error: any, message: string = 'An error occurred') {
    console.error(message, error);
    // Implement your error handling logic here
    // For example, show a toast notification or alert
  }

  // Performance Optimization Methods
  private debounce(func: Function, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // The debounced version of updateMarkers
  private debouncedUpdateMarkers = this.debounce(() => {
    this.updateMarkers();
  }, 100);

  // Additional Helper Methods
  formatRating(rating: number): string {
    return rating.toFixed(1);
  }

  getCompletedJobsText(jobs: number): string {
    return jobs === 1 ? 'مهمة منجزة' : 'مهمات منجزة';
  }

  getRatingColor(rating: number): string {
    if (rating >= 4.5) return '#4CAF50';
    if (rating >= 4.0) return '#8BC34A';
    if (rating >= 3.5) return '#FFC107';
    if (rating >= 3.0) return '#FF9800';
    return '#F44336';
  }

  getDistanceColor(distance: string): string {
    const numericDistance = parseFloat(distance);
    if (numericDistance <= 1) return '#4CAF50';
    if (numericDistance <= 3) return '#8BC34A';
    if (numericDistance <= 5) return '#FFC107';
    if (numericDistance <= 10) return '#FF9800';
    return '#F44336';
  }

  // Accessibility Methods
  getAriaLabel(provider: Worker): string {
    return `${provider.name}, ${provider.service}, تقييم ${provider.rating}, ${this.getProviderDistance(provider)} من موقعك`;
  }
}
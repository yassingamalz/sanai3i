import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { icon, latLng, marker, tileLayer, Map, Layer, Icon } from 'leaflet';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WorkerService } from '../../../../core/services/worker.service';

export interface ServiceProvider {
  id: number;
  name: string;
  service: string;
  category: string;
  rating: number;
  distance: string;
  image: string;
  position: [number, number];
  jobs?: number;
  address?: string;
  completedJobs?: number;
}

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();
  private resizeListener: () => void;
  private mapContainer: HTMLElement | null = null;
  protected Math = Math;

  categories = [
    { id: 'all', name: 'الكل' },
    { id: 'electrician', name: 'كهربائي' },
    { id: 'carpenter', name: 'سباك' },
    { id: 'plumber', name: 'نجار' },
    { id: 'painter', name: 'نقاش' }
  ];

  map: Map | null = null;
  markers: Layer[] = [];
  providers: ServiceProvider[] = [];
  selectedCategory = 'all';
  currentPosition: [number, number] = [30.0444, 31.2357];
  currentAddress = 'القاهرة، المعادي';
  selectedProvider: ServiceProvider | null = null;
  searchQuery: string = '';

  private readonly currentLocationIcon: Icon = icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyMCIgZmlsbD0iI0UyNEM0QyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI2Ii8+CiAgPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iOCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    className: 'current-location-marker'
  });

  private readonly providerIcon: Icon = icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgZmlsbD0iI0UyNEM0QyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+Cjwvc3ZnPg==',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    className: 'provider-marker'
  });

  options = {
    layers: [
      tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: ''
      })
    ],
    zoom: 15,
    center: latLng(this.currentPosition[0], this.currentPosition[1]),
    zoomControl: false
  };

  constructor(
    private workerService: WorkerService,
    private router: Router
  ) {
    this.resizeListener = () => {
      if (this.map) {
        setTimeout(() => this.map?.invalidateSize(), 100);
      }
    };
  }

  ngOnInit() {
    this.loadWorkersFromService();
    this.initializeMap();
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
    try {
      if (this.markers.length) {
        this.markers.forEach(marker => marker?.remove());
        this.markers = [];
      }

      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
      }

      if (this.map) {
        this.map.off();
        this.map.remove();
        
        this.mapContainer = document.querySelector('.leaflet-container');
        this.mapContainer?.remove();
      }

      this.map = null;
      this.destroy$.next();
      this.destroy$.complete();

      window.removeEventListener('openWorkerProfile', this.handleWorkerProfileClick as EventListener);
    } catch (e) {
      console.error('Error cleaning up map:', e);
    }
  }

  private loadWorkersFromService() {
    this.workerService.getWorkers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(workers => {
        this.providers = workers.map(worker => ({
          id: worker.id,
          name: worker.name,
          service: worker.service,
          category: worker.category,
          rating: Number(worker.rating.toFixed(2)),
          distance: '0.0 km',
          image: worker.image || '/api/placeholder/80/80',
          position: worker.position || this.currentPosition,
          jobs: worker.completedJobs,
          address: worker.address,
          completedJobs: worker.completedJobs
        }));
        this.loadProviders();
      });
  }

  onMapReady(map: Map) {
    if (this.map) return;
    
    this.map = map;
    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('openWorkerProfile', this.handleWorkerProfileClick as EventListener);
    
    map.on('click', () => this.clearSelectedProvider());
    this.updateMarkers();
  }

  private handleWorkerProfileClick = (event: CustomEvent) => {
    this.navigateToWorkerProfile(event.detail);
  };

  initializeMap() {
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
          console.log('Geolocation error:', error);
          this.updateMarkers();
        }
      );
    } else {
      this.updateMarkers();
    }
  }

  loadProviders() {
    const filteredProviders = this.selectedCategory === 'all' 
      ? this.providers 
      : this.providers.filter(p => p.category === this.selectedCategory);
    
    this.providers = filteredProviders.map(provider => ({
      ...provider,
      distance: this.calculateDistance(
        this.currentPosition[0],
        this.currentPosition[1],
        provider.position[0],
        provider.position[1]
      )
    }));

    this.updateMarkers();
  }

  updateMarkers() {
    if (!this.map) return;

    this.markers.forEach(marker => marker.removeFrom(this.map!));
    this.markers = [];

    const currentLocationMarker = marker(this.currentPosition, {
      icon: this.currentLocationIcon
    }).bindPopup('موقعك الحالي');
    
    this.markers.push(currentLocationMarker);
    currentLocationMarker.addTo(this.map);

    this.providers.forEach(provider => {
      const popupContent = `
        <div class="provider-popup" dir="rtl">
          <h3 class="text-lg font-bold">${provider.name}</h3>
          <p class="text-gray-600">${provider.service}</p>
          <div class="flex items-center mt-1">
            <span class="text-yellow-500 mr-1">⭐</span>
            <span>${provider.rating}</span>
          </div>
          <button 
            onclick="window.dispatchEvent(new CustomEvent('openWorkerProfile', {detail: ${provider.id}}))"
            class="mt-2 px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors">
            عرض الملف الشخصي
          </button>
        </div>
      `;

      const providerMarker = marker(provider.position, {
        icon: this.providerIcon
      })
      .bindPopup(popupContent, { 
        className: 'provider-popup',
        closeButton: false
      })
      .on('click', () => this.selectProvider(provider));

      this.markers.push(providerMarker);
      providerMarker.addTo(this.map!);
    });
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.selectedProvider = null;
    this.loadProviders();
  }

  selectProvider(provider: ServiceProvider) {
    this.selectedProvider = provider;
    if (this.map) {
      this.map.setView(provider.position, this.map.getZoom());
    }
  }

  navigateToWorkerProfile(workerId: number) {
    this.router.navigate(['/worker', workerId]);
  }

  clearAddress() {
    this.searchQuery = '';
    this.currentAddress = '';
  }

  clearSelectedProvider() {
    this.selectedProvider = null;
  }

  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 
      ? `${Math.round(distance * 1000)} م` 
      : `${distance.toFixed(1)} كم`;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}
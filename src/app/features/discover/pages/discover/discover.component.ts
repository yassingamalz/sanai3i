import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { icon, latLng, marker, tileLayer, Map, Layer, Icon } from 'leaflet';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  providers: ServiceProvider[] = [
    {
      id: 1,
      name: 'عم حسن',
      service: 'كهربائي',
      category: 'electrician',
      rating: 4.9,
      distance: '0.3 كم',
      image: '/api/placeholder/80/80',
      position: [30.0444, 31.2357],
      jobs: 230,
      address: 'المعادي، القاهرة'
    },
    {
      id: 2,
      name: 'أستاذ محمد',
      service: 'سباك',
      category: 'plumber',
      rating: 4.8,
      distance: '0.5 كم',
      image: '/api/placeholder/80/80',
      position: [30.0454, 31.2367],
      jobs: 180,
      address: 'المعادي، القاهرة'
    },
    {
      id: 3,
      name: 'الحاج كريم',
      service: 'نقاش',
      category: 'painter',
      rating: 4.7,
      distance: '0.7 كم',
      image: '/api/placeholder/80/80',
      position: [30.0434, 31.2347],
      jobs: 150,
      address: 'المعادي، القاهرة'
    }
  ];

  map: Map | null = null;
  markers: Layer[] = [];
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

  constructor() {
    this.resizeListener = () => {
      if (this.map) {
        setTimeout(() => this.map?.invalidateSize(), 100);
      }
    };
  }

  ngOnInit() {
    this.initializeMap();
    this.loadProviders();
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
      // First remove markers
      if (this.markers.length) {
        this.markers.forEach(marker => {
          if (marker) {
            marker.remove();
          }
        });
        this.markers = [];
      }
  
      // Remove resize listener
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
      }
  
      // Clean up map
      if (this.map) {
        this.map.off();
        this.map.remove();
        
        // Get the map container
        this.mapContainer = document.querySelector('.leaflet-container');
        if (this.mapContainer) {
          this.mapContainer.remove();
        }
      }
  
      // Null out the map reference
      this.map = null;
  
      // Complete observables
      this.destroy$.next();
      this.destroy$.complete();
    } catch (e) {
      console.error('Error cleaning up map:', e);
    }
  }
  
  onMapReady(map: Map) {
    if (this.map) {
      return; 
    }
    
    this.map = map;
    
    // Add resize listener
    window.addEventListener('resize', this.resizeListener);
  
    // Add click handler to close provider card
    map.on('click', () => {
      this.clearSelectedProvider();
    });
  
    this.updateMarkers();
  }

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

    // Clear existing markers
    this.markers.forEach(marker => {
      if (marker && this.map) {
        marker.removeFrom(this.map); 
      }
    });
    this.markers = [];

    // Add current location marker
    const currentLocationMarker = marker(this.currentPosition, {
      icon: this.currentLocationIcon
    }).bindPopup('موقعك الحالي');

    this.markers.push(currentLocationMarker);
    currentLocationMarker.addTo(this.map);

    // Add provider markers
    this.providers.forEach(provider => {
      const popupContent = `
        <div class="provider-popup" dir="rtl">
          <h3 class="text-lg font-bold">${provider.name}</h3>
          <p class="text-gray-600">${provider.service}</p>
          <div class="flex items-center mt-1">
            <span class="text-yellow-500 mr-1">⭐</span>
            <span>${provider.rating}</span>
          </div>
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
    this.selectedProvider = null; // Clear selected provider when changing category
    this.loadProviders();
  }

  selectProvider(provider: ServiceProvider) {
    this.selectedProvider = provider;
    if (this.map) {
      this.map.setView(provider.position, this.map.getZoom());
    }
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
    // Implement search logic here
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const R = 6371; // Earth's radius in km
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
// discover.component.ts
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { icon, latLng, marker, tileLayer, Map, Layer } from 'leaflet';

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

  map!: Map;
  markers: Layer[] = [];
  selectedCategory = 'all';
  currentPosition: [number, number] = [30.0444, 31.2357]; // Cairo coordinates
  currentAddress = 'القاهرة، المعادي';
  selectedProvider: ServiceProvider | null = null;
  searchQuery: string = '';

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
category: any;

  constructor() {}

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
    // Cleanup map listeners
    if (this.map) {
      this.map.remove();
    }
  }

  initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = [position.coords.latitude, position.coords.longitude];
        if (this.map) {
          this.map.setView(latLng(this.currentPosition[0], this.currentPosition[1]), 15);
          this.updateMarkers();
        }
      });
    }
  }

  onMapReady(map: Map) {
    this.map = map;
    
    window.addEventListener('resize', () => {
      setTimeout(() => map.invalidateSize(), 100);
    });

    this.updateMarkers();
  }

  loadProviders() {
    this.providers = this.selectedCategory === 'all' 
      ? this.providers 
      : this.providers.filter(p => p.category === this.selectedCategory);
    this.updateMarkers();
  }

  updateMarkers() {
    if (!this.map) return;

    // Clear existing markers
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];

    // Add current location marker
    const currentLocationMarker = marker(this.currentPosition, {
      icon: icon({
        iconUrl: 'assets/current-location.svg',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        className: 'current-location-marker'
      })
    });

    this.markers.push(currentLocationMarker);
    currentLocationMarker.addTo(this.map);

    // Add provider markers
    this.providers.forEach(provider => {
      const providerMarker = marker(provider.position, {
        icon: icon({
          iconUrl: 'assets/provider-marker.svg',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          className: 'provider-marker'
        })
      }).on('click', () => this.selectProvider(provider));

      this.markers.push(providerMarker);
      providerMarker.addTo(this.map);
    });
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.loadProviders();
  }

  selectProvider(provider: ServiceProvider) {
    this.selectedProvider = provider;
    this.map.setView(provider.position, this.map.getZoom());
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
    // Add your search logic here
  }
}
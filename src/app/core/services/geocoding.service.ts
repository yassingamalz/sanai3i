import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TileLayerOptions, TileLayer, tileLayer } from 'leaflet';

interface GeocodingResult {
  mainText: string;
  subText: string;
  location: [number, number];
}

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  searchAddress(query: string): Observable<GeocodingResult[]> {
    const params = {
      q: query,
      format: 'json',
      limit: 5,
      'accept-language': 'ar',
      countrycodes: 'eg' // Limit to Egypt
    };

    return this.http.get<any[]>(this.baseUrl, { params }).pipe(
      map(results => results.map(result => ({
        mainText: result.display_name.split(',')[0],
        subText: result.display_name.split(',').slice(1).join(',').trim(),
        location: [parseFloat(result.lat), parseFloat(result.lon)]
      })))
    );
  }

  reverseGeocode(lat: number, lng: number): Observable<string> {
    // Replace this URL with your actual geocoding service endpoint
    const url = `your-geocoding-api-endpoint/reverse?lat=${lat}&lng=${lng}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        // Adjust this according to your API response structure
        return response.formattedAddress || 'Unknown location';
      }),
      catchError(error => {
        console.error('Reverse geocoding error:', error);
        return of('Unknown location');
      })
    );
  }


  private static readonly DEFAULT_TILE_CONFIG = {
    // CartoDB's Voyager tiles are optimized for performance
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    options: {
      maxZoom: 19,
      minZoom: 1,
      attribution: '',  // Remove attribution for cleaner UI
      subdomains: 'abcd',
      // Performance optimizations
      updateWhenIdle: true,
      updateWhenZooming: false,
      keepBuffer: 2,
      // Caching improvements
      crossOrigin: true,
      maxNativeZoom: 18,
      // Reduce server load
      bounds: [
        [-90, -180],
        [90, 180]
      ],
      // Additional performance settings
      tileSize: 256,
      zoomOffset: 0,
      detectRetina: true
    } as TileLayerOptions
  };

  private static readonly TILE_PROVIDERS = {
    carto: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: {
        maxZoom: 19,
        attribution: ''
      }
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        maxZoom: 19,
        attribution: ''
      }
    },
    mapbox: {
      url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      options: {
        maxZoom: 19,
        attribution: '',
        id: 'mapbox/streets-v11'
      }
    }
  };

  /**
   * Creates an optimized tile layer with built-in caching and performance settings
   */
  public static createTileLayer(
    provider: 'carto' | 'osm' | 'mapbox' = 'carto',
    customOptions: Partial<TileLayerOptions> = {}
  ): TileLayer {
    const selectedProvider = this.TILE_PROVIDERS[provider];
    const options = {
      ...this.DEFAULT_TILE_CONFIG.options,
      ...selectedProvider.options,
      ...customOptions
    };

    return tileLayer(selectedProvider.url, options);
  }

  /**
   * Creates a preconfigured fast loading tile layer
   */
  public static createFastTileLayer(): TileLayer {
    return this.createTileLayer('carto', {
      // Additional performance optimizations
      updateInterval: 200,      // Reduce update frequency
      keepBuffer: 4,           // Increase tile buffer for smoother panning
      updateWhenZooming: false // Disable updates during zoom
    });
  }

  /**
   * Creates a minimal tile layer for maximum performance
   */
  public static createLightTileLayer(): TileLayer {
    return this.createTileLayer('carto', {
      maxZoom: 16,             // Limit max zoom for better performance
      keepBuffer: 1,           // Minimal buffer
      updateInterval: 300,     // Reduced update frequency
      maxNativeZoom: 16,       // Limit native zoom
      tileSize: 512,          // Larger tiles = fewer requests
      zoomOffset: -1          // Adjust for larger tile size
    });
  }
}
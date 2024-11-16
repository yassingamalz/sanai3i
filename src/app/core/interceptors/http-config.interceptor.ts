import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add required headers only for Nominatim requests
    if (request.url.includes('nominatim.openstreetmap.org')) {
      request = request.clone({
        setHeaders: {
          'User-Agent': 'SanayeiyApp/1.0',
          'Accept': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}
import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  Router, 
  RouterStateSnapshot, 
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        // Store attempted URL for redirecting
        const currentUrl = state.url;
        
        if (user) {
          // Check if user has required role/type for specific routes
          if (route.data?.['roles'] && !route.data['roles'].includes(user.type)) {
            // Redirect to home if user doesn't have required role
            return this.router.createUrlTree(['/']);
          }
          return true;
        }

        // Store the attempted URL for redirecting after login
        localStorage.setItem('returnUrl', currentUrl);
        
        // Redirect to auth/welcome
        return this.router.createUrlTree(['/auth/welcome']);
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }
}
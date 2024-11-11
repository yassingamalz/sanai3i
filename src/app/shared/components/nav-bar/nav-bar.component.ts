import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get currentRoute(): string {
    return this.router.url.split('/')[1] || 'home';
  }

  get userType(): string {
    return this.authService.getCurrentUser()?.type || 'customer';
  }

  get servicesLabel(): string {
    return this.userType === 'worker' ? 'خدماتي' : 'طلباتي';
  }
}
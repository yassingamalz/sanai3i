import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  userData = {
    name: 'أحمد محمد',
    phone: '01234567890',
    email: 'ahmed@example.com',
    rating: 4.8,
    completedJobs: 150,
    balance: 2500,
    address: {
      title: 'المنزل',
      details: 'شارع 9، المعادي، القاهرة'
    }
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get userType() {
    return this.authService.getCurrentUser()?.type;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/welcome']);
  }
}
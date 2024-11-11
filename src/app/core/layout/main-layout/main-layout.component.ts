import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get currentRoute(): string {
    return this.router.url.split('/')[1] || 'home';
  }
}
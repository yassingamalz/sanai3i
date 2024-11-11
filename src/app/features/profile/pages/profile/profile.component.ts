import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() userType: string = '';

  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['/login']);
  }
}
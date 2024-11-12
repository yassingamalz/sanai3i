// user-type.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserType } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  selectType(type: UserType): void {
    this.authService.login(type);
    this.router.navigate(['/']);
  }
}
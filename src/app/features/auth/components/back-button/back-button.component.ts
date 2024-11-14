import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  @Input() text: string = 'رجوع';
  @Input() redirectUrl?: string;

  constructor(private router: Router) {}

  navigateBack(): void {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else {
      window.history.back();
    }
  }
}
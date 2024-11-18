// welcome.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  logoPath = '/assets/images/logo.svg';
  illustrationPath = '/assets/images/welcome/construction-worker-animate.svg';
  
  logoLoaded = false;
  illustrationLoaded = false;

  constructor(private router: Router) {}

  get imagesLoaded(): boolean {
    return this.logoLoaded && this.illustrationLoaded;
  }

  onLogoLoad(): void {
    this.logoLoaded = true;
  }

  onIllustrationLoad(): void {
    this.illustrationLoaded = true;
  }

  navigate(route: string): void {
    this.router.navigate(['/auth/' + route]);
  }
}
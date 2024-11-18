// welcome.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
 selector: 'app-welcome',
 templateUrl: './welcome.component.html',
 styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {  logoPath = 'assets/images/logo.svg';
  illustrationPath = 'assets/images/welcome/construction-worker-animate.svg';
  
  private _logoLoaded = false;
  private _illustrationLoaded = false;
  showSpinner = true;

  constructor(private router: Router) {}

  get imagesLoaded(): boolean {
    return this._logoLoaded && this._illustrationLoaded;
  }

  onLogoLoad(): void {
    this._logoLoaded = true;
    this.checkAllLoaded();
  }

  onIllustrationLoad(): void {
    this._illustrationLoaded = true;
    this.checkAllLoaded();
  }

  private checkAllLoaded(): void {
    if (this.imagesLoaded) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        this.showSpinner = false;
      }, 300);
    }
  }

  navigate(route: string): void {
    this.router.navigate(['/auth/' + route]);
  }
}
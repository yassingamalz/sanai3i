
  
  // welcome.component.ts
  import { Component, AfterViewInit } from '@angular/core';
  import { Router } from '@angular/router';
  
  @Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
  })
  export class WelcomeComponent implements AfterViewInit {
    constructor(private router: Router) {}
  
    ngAfterViewInit() {
      // Add animation class after a delay
      window.setTimeout(() => {
        const svg = document.querySelector('svg');
        if (svg) {
          svg.classList.add('animated');
        }
      }, 1000);
    }
  
    navigate(route: string): void {
      this.router.navigate(['/auth/user-type']);
    }
  }
// top-workers.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { Worker } from '../../../../shared/interfaces/worker.interface';

@Component({
  selector: 'app-top-workers',
  templateUrl: './top-workers.component.html',
  styleUrls: ['./top-workers.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('0.5s {{ delay }}ms ease-out', 
          style({ transform: 'translateY(0)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class TopWorkersComponent {
  // Input properties
  @Input() topWorkers: Worker[] = [];
  @Input() isLoading = true;

  // Optional state management if needed for animations
  cardStates: { [key: number]: boolean } = {};

  constructor(private router: Router) {}

  /**
   * Track worker items by their ID for optimal rendering performance
   */
  trackByWorkerId(index: number, item: Worker): number {
    return item.id;
  }

  /**
   * Handle click event on worker card
   * Navigates to worker detail page
   */
  onWorkerClick(worker: Worker): void {
    this.router.navigate(['/worker', worker.id]);
  }

  /**
   * Optional method to initialize card animations
   */
  initializeAnimations(): void {
    if (this.topWorkers.length) {
      this.topWorkers.forEach((_, index) => {
        setTimeout(() => {
          this.cardStates[index] = true;
        }, index * 100);
      });
    }
  }
}
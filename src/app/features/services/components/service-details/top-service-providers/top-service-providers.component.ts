// top-service-providers.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Worker } from '../../../../../shared/interfaces/worker.interface';

@Component({
  selector: 'app-top-service-providers',
  templateUrl: './top-service-providers.component.html',
  styleUrls: ['./top-service-providers.component.scss']
})
export class TopServiceProvidersComponent {
  @Input() topWorkers: Worker[] = [];

  constructor(private router: Router) {}

  onWorkerClick(workerId: number): void {
    this.router.navigate(['/worker', workerId]);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-service-overview',
  templateUrl: './service-overview.component.html',
  styleUrls: ['./service-overview.component.scss'],
})
export class ServiceOverviewComponent implements OnInit {
  @Input() service!: MainService;
  @Input() stats!: {
    totalWorkers: number;
    averageRating: number;
    completedJobs: number;
    averagePrice: number;
  };

  loading = true;

  ngOnInit() {
    setTimeout(() => {
      if (this.service && this.stats) {
        this.loading = false;
      }
    }, 1500);
  }

  // Optional tracking method
  trackByFn(index: number): number {
    return index;
  }
}
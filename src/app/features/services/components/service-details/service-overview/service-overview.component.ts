// service-overview.component.ts
import { Component, Input } from '@angular/core';
import { MainService } from '../../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-service-overview',
  templateUrl: './service-overview.component.html',
  styleUrls: ['./service-overview.component.scss']
})
export class ServiceOverviewComponent {
  @Input()
  service!: MainService;
  @Input()
  stats!: {
    totalWorkers: number;
    averageRating: number;
    completedJobs: number;
    averagePrice: number;
  };
}
// service-items.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceSection, ServiceItem } from '../../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-service-items',
  templateUrl: './service-items.component.html',
  styleUrls: ['./service-items.component.scss']
})
export class ServiceItemsComponent {
  @Input()
  serviceSections!: ServiceSection[];
  @Input()
  serviceId!: number;

  constructor(private router: Router) {}

  onSubServiceClick(subService: ServiceItem): void {
    this.router.navigate(['/services', this.serviceId, 'sub-service', subService.id]);
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService, TrendySubService } from '../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-trending-services',
  templateUrl: './trending-services.component.html',
  styleUrls: ['./trending-services.component.scss']
})
export class TrendingServicesComponent {
  @Input() topSubServices: TrendySubService[] = [];
  @Input() isLoading = true;
  @Input() mainServicesMap: Map<number, MainService> = new Map();

  constructor(private router: Router) {}

  trackBySubServiceId(index: number, item: TrendySubService): string {
    return `${item.mainServiceId}-${item.id}`;
  }

  navigateToSubService(mainServiceId: number, subServiceId: number): void {
    this.router.navigate(['/services', mainServiceId, 'sub-service', subServiceId]);
  }

  getMainService(mainServiceId: number): MainService | undefined {
    return this.mainServicesMap.get(mainServiceId);
  }
}

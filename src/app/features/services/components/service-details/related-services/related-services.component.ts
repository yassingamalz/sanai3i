import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-related-services',
  templateUrl: './related-services.component.html',
  styleUrls: ['./related-services.component.scss']
})
export class RelatedServicesComponent {
  @Input() relatedServices: MainService[] = [];
  @Output() serviceClick = new EventEmitter<number>();

  constructor(
    private router: Router
  ) {}

  onRelatedServiceClick(id: number): void {
    this.router.navigate(['services', id], {
      replaceUrl: true
    });
  }
}
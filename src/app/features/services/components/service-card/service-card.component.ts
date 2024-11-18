// service-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input() service!: MainService;
  @Output() cardClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.service.id);
  }
}
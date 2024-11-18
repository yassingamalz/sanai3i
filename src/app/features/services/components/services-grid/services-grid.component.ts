// services-grid.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from '../../../../shared/interfaces/service.interface';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-services-grid',
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.scss'],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(20px)'
          }),
          stagger(50, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({
                opacity: 1,
                transform: 'translateY(0)'
              })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ServicesGridComponent {
  @Input() services: MainService[] = [];
  @Input() isLoading = false;
  @Output() serviceClick = new EventEmitter<number>();

  trackByServiceId(index: number, service: MainService): number {
    return service.id;
  }
}
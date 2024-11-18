import { Component, Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { MainService } from '../../../../shared/interfaces/service.interface';

@Component({
  selector: 'app-services-grid',
  templateUrl: './services-grid.component.html',
  styleUrls: ['./services-grid.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => in', [
        animate('0.8s 0.3s ease-out')
      ])
    ])
  ]
})
export class ServicesGridComponent {
  @Input() services: MainService[] = [];
  @Input() isLoading = true;
  @Input() cardStates: { [key: number]: boolean } = {};
  @Output() serviceClick = new EventEmitter<number>();

  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  shouldAnimate(index: number): boolean {
    return !this.isLoading && this.cardStates[index];
  }

  openService(id: number): void {
    this.serviceClick.emit(id);
  }

  navigateToFullList(): void {
    this.serviceClick.emit(-1); // Using -1 to indicate "view all"
  }

  trackByServiceId(index: number, item: MainService): number {
    return item.id;
  }
}
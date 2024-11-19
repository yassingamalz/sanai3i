// sub-service-summary.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-service-summary',
  templateUrl: './sub-service-summary.component.html',
  styleUrls: ['./sub-service-summary.component.scss']
})
export class SubServiceSummaryComponent {
  @Input() totalPrice: number = 0;
  @Input() isDisabled: boolean = false;
  @Input() buttonText: string = 'طلب الخدمة';
  @Output() orderClicked = new EventEmitter<void>();

  onOrderClick(): void {
    if (!this.isDisabled) {
      this.orderClicked.emit();
    }
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-service-quantity',
  templateUrl: './sub-service-quantity.component.html',
  styleUrls: ['./sub-service-quantity.component.scss']
})
export class SubServiceQuantityComponent {
  @Input() quantity: number = 1;
  @Input() minQuantity: number = 1;
  @Input() maxQuantity: number = 10;
  @Output() quantityChanged = new EventEmitter<number>();

  increase(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
      this.quantityChanged.emit(this.quantity);
    }
  }

  decrease(): void {
    if (this.quantity > this.minQuantity) {
      this.quantity--;
      this.quantityChanged.emit(this.quantity);
    }
  }

  isMinQuantity(): boolean {
    return this.quantity <= this.minQuantity;
  }

  isMaxQuantity(): boolean {
    return this.quantity >= this.maxQuantity;
  }
}
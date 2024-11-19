// sub-service-payment.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

export type PaymentMethod = 'cash' | 'card';

export interface PaymentOption {
  id: PaymentMethod;
  icon: string;
  label: string;
  description?: string;
}

@Component({
  selector: 'app-sub-service-payment',
  templateUrl: './sub-service-payment.component.html',
  styleUrls: ['./sub-service-payment.component.scss']
})
export class SubServicePaymentComponent {
  @Input() selectedMethod: PaymentMethod = 'cash';
  @Output() methodSelected = new EventEmitter<PaymentMethod>();

  paymentMethods: PaymentOption[] = [
    { 
      id: 'cash', 
      icon: 'fas fa-money-bill', 
      label: 'الدفع نقداً',
      description: 'ادفع عند اكتمال الخدمة'
    },
    { 
      id: 'card', 
      icon: 'fas fa-credit-card', 
      label: 'البطاقة البنكية',
      description: 'ادفع بأمان باستخدام البطاقة'
    }
  ];

  onMethodSelect(method: PaymentMethod): void {
    this.selectedMethod = method;
    this.methodSelected.emit(method);
  }
}
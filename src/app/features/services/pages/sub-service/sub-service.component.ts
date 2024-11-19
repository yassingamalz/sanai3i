// sub-service.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { ServicesService } from '../../../../core/services/services.service';
import { MainService, SubService } from '../../../../shared/interfaces/service.interface';
import { ExtraOption } from '../../components/sub-service/sub-service-extras/sub-service-extras.component';
import { PaymentMethod } from '../../components/sub-service/sub-service-payment/sub-service-payment.component';

@Component({
  selector: 'app-sub-service',
  templateUrl: './sub-service.component.html',
  styleUrls: ['./sub-service.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class SubServiceComponent implements OnInit {
  mainService!: MainService;
  subService?: SubService;
  paymentMethod: PaymentMethod = 'cash';
  quantity: number = 1;
  loading: boolean = true;
  error: string | null = null;
  tax: number = 0;
  discount: number = 0;

  extras: ExtraOption[] = [
    { id: 'tools', name: 'توفير المعدات', price: 35.00, description: 'توفير جميع المعدات اللازمة للخدمة' },
    { id: 'express', name: 'خدمة سريعة', price: 50.00, description: 'تنفيذ الخدمة خلال 24 ساعة' },
    { id: 'warranty', name: 'ضمان إضافي', price: 25.00, description: 'ضمان إضافي لمدة سنة' },
    { id: 'inspection', name: 'فحص شامل', price: 30.00, description: 'فحص شامل للخدمة' }
  ];

  constructor(
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService
  ) {}

  ngOnInit() {
    this.loadService();
  }

  private loadService() {
    const mainServiceId = +this.route.snapshot.params['mainId'];
    const subServiceId = +this.route.snapshot.params['subId'];

    this.loading = true;
    this.error = null;

    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);

    this.servicesService.getServiceById(mainServiceId).subscribe({
      next: (service) => {
        if (service) {
          this.mainService = service;
          this.subService = service.subServices?.find(sub => sub.id === subServiceId);
          if (!this.subService) {
            this.error = 'الخدمة غير موجودة';
            this.router.navigate(['/services', mainServiceId]);
          }
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'حدث خطأ أثناء تحميل الخدمة';
        this.loading = false;
        this.router.navigate(['/services']);
      }
    });
  }

  // Price calculations
  get subtotal(): number {
    const basePrice = this.subService?.price || 0;
    const extrasPrice = this.extras
      .filter(extra => extra.selected)
      .reduce((sum, extra) => sum + extra.price, 0);
    return basePrice * this.quantity + extrasPrice;
  }

  get taxAmount(): number {
    return this.subtotal * 0.14; // 14% VAT
  }

  get totalPrice(): number {
    return this.subtotal + this.taxAmount - this.discount;
  }

  // Validation
  get isValid(): boolean {
    return this.subtotal > 0 && 
           this.quantity > 0 && 
           !!this.paymentMethod && 
           !this.loading && 
           !this.error;
  }

  // Event handlers
  onExtraToggled(extra: ExtraOption): void {
    const index = this.extras.findIndex(e => e.id === extra.id);
    if (index !== -1) {
      this.extras[index].selected = extra.selected;
    }
  }

  onQuantityChanged(newQuantity: number): void {
    this.quantity = newQuantity;
  }

  onPaymentMethodSelected(method: PaymentMethod): void {
    this.paymentMethod = method;
  }

  onOrderConfirmed(): void {
    if (this.isValid) {
      const order = {
        mainService: this.mainService?.id,
        subService: this.subService?.id,
        quantity: this.quantity,
        extras: this.extras.filter(e => e.selected).map(e => e.id),
        paymentMethod: this.paymentMethod,
        subtotal: this.subtotal,
        tax: this.taxAmount,
        discount: this.discount,
        total: this.totalPrice
      };
      
      this.router.navigate(['/order/confirm'], { state: { order } });
    }
  }

  // Loading state check
  get showContent(): boolean {
    return !this.loading && !this.error && !!this.subService;
  }
}
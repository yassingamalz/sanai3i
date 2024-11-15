import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition, group } from '@angular/animations';
import { MainService, SubService } from '../../../../shared/interfaces/service.interface';
import { ServicesService } from '../../../../core/services/services.service';

interface ExtraOption {
  id: string;
  name: string;
  price: number;
  selected?: boolean;
}

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
  mainService: MainService | undefined;
  subService: SubService | undefined;
  quantity = 1;
  extras: ExtraOption[] = [
    { id: 'tools', name: 'توفير المعدات', price: 35.00 },
    { id: 'express', name: 'خدمة سريعة', price: 50.00 },
    { id: 'warranty', name: 'ضمان إضافي', price: 25.00 },
    { id: 'inspection', name: 'فحص شامل', price: 30.00 }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService
  ) {}

  ngOnInit() {
    const mainServiceId = +this.route.snapshot.params['mainId'];
    const subServiceId = +this.route.snapshot.params['subId'];
    
    this.servicesService.getServiceById(mainServiceId).subscribe(service => {
      if (service) {
        this.mainService = service;
        this.subService = service.subServices?.find(sub => sub.id === subServiceId);
      }
    });
  }

  get totalPrice(): number {
    const basePrice = this.subService?.price || 0;
    const extrasPrice = this.extras
      .filter(extra => extra.selected)
      .reduce((sum, extra) => sum + extra.price, 0);
    return (basePrice + extrasPrice) * this.quantity;
  }

  toggleExtra(extra: ExtraOption) {
    extra.selected = !extra.selected;
  }

  updateQuantity(increment: boolean) {
    if (increment && this.quantity < 10) {
      this.quantity++;
    } else if (!increment && this.quantity > 1) {
      this.quantity--;
    }
  }

  placeOrder() {
    const order = {
      mainService: this.mainService?.id,
      subService: this.subService?.id,
      quantity: this.quantity,
      extras: this.extras.filter(e => e.selected).map(e => e.id),
      totalPrice: this.totalPrice
    };
    console.log('Placing order:', order);
    // Navigate to confirmation or payment
    this.router.navigate(['/order/confirm'], { state: { order } });
  }
}
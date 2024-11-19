import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServicePaymentComponent } from './sub-service-payment.component';

describe('SubServicePaymentComponent', () => {
  let component: SubServicePaymentComponent;
  let fixture: ComponentFixture<SubServicePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubServicePaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubServicePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

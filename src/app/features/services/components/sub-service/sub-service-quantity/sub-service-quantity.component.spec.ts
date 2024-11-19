import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceQuantityComponent } from './sub-service-quantity.component';

describe('SubServiceQuantityComponent', () => {
  let component: SubServiceQuantityComponent;
  let fixture: ComponentFixture<SubServiceQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubServiceQuantityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubServiceQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceSummaryComponent } from './sub-service-summary.component';

describe('SubServiceSummaryComponent', () => {
  let component: SubServiceSummaryComponent;
  let fixture: ComponentFixture<SubServiceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubServiceSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubServiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

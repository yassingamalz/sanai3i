import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedServicesComponent } from './related-services.component';

describe('RelatedServicesComponent', () => {
  let component: RelatedServicesComponent;
  let fixture: ComponentFixture<RelatedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

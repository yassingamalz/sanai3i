import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceDescriptionComponent } from './sub-service-description.component';

describe('SubServiceDescriptionComponent', () => {
  let component: SubServiceDescriptionComponent;
  let fixture: ComponentFixture<SubServiceDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubServiceDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubServiceDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

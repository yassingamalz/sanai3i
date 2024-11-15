import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceComponent } from './sub-service.component';

describe('SubServiceComponent', () => {
  let component: SubServiceComponent;
  let fixture: ComponentFixture<SubServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

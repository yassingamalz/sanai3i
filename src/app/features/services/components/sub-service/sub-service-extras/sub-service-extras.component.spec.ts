import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceExtrasComponent } from './sub-service-extras.component';

describe('SubServiceExtrasComponent', () => {
  let component: SubServiceExtrasComponent;
  let fixture: ComponentFixture<SubServiceExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubServiceExtrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubServiceExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

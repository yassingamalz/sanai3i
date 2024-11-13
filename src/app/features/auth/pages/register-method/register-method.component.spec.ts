import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMethodComponent } from './register-method.component';

describe('RegisterMethodComponent', () => {
  let component: RegisterMethodComponent;
  let fixture: ComponentFixture<RegisterMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

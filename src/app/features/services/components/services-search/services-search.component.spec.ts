import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSearchComponent } from './services-search.component';

describe('ServicesSearchComponent', () => {
  let component: ServicesSearchComponent;
  let fixture: ComponentFixture<ServicesSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

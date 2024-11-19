import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceHeaderComponent } from './sub-service-header.component';

describe('SubServiceHeaderComponent', () => {
  let component: SubServiceHeaderComponent;
  let fixture: ComponentFixture<SubServiceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubServiceHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubServiceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWorkersComponent } from './top-workers.component';

describe('TopWorkersComponent', () => {
  let component: TopWorkersComponent;
  let fixture: ComponentFixture<TopWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopWorkersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

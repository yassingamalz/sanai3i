import { TestBed } from '@angular/core/testing';

import { FeaturedSliderService } from './featured-slider.service';

describe('FeaturedSliderService', () => {
  let service: FeaturedSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturedSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

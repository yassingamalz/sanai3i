// featured-slider.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeaturedSliderService } from '../../../core/services/featured-slider.service';
import { FeaturedAd } from '../../interfaces/featured-slider.interface';

@Component({
  selector: 'app-featured-slider',
  templateUrl: './featured-slider.component.html',
  styleUrls: ['./featured-slider.component.scss']
})
export class FeaturedSliderComponent implements OnInit, OnDestroy {
  featuredAds: FeaturedAd[] = [];
  currentIndex = 0;
  loading = true;
  private destroy$ = new Subject<void>();
  private autoSlideEnabled = true;
  private readonly slideInterval = 5000;

  constructor(
    private featuredService: FeaturedSliderService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFeaturedAds();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFeaturedAds(): void {
    this.featuredService.getFeaturedAds()
      .pipe(takeUntil(this.destroy$))
      .subscribe(ads => {
        this.featuredAds = ads;
        if (ads.length > 0) {
          this.preloadImages();
        }
      });
  }

  private preloadImages(): void {
    let loadedImages = 0;
    this.featuredAds.forEach((ad, index) => {
      const img = new Image();
      img.onload = () => {
        loadedImages++;
        if (loadedImages === this.featuredAds.length) {
          this.loading = false;
          this.startAutoSlide();
          this.cdr.detectChanges();
        }
      };
      img.src = ad.image;
    });
  }

  private setupEventListeners(): void {
    const container = document.querySelector('.slider-container');
    if (container) {
      container.addEventListener('mouseenter', () => {
        this.autoSlideEnabled = false;
      });
      container.addEventListener('mouseleave', () => {
        this.autoSlideEnabled = true;
      });
    }
  }

  private startAutoSlide(): void {
    interval(this.slideInterval)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.autoSlideEnabled && this.featuredAds.length > 1) {
          this.next();
        }
      });
  }

  getSlidePosition(index: number): { [key: string]: string } {
    const position = (index - this.currentIndex) * 100;
    return {
      'transform': `translateX(${position}%)`,
      'z-index': index === this.currentIndex ? '1' : '0'
    };
  }

  next(): void {
    if (this.featuredAds.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.featuredAds.length;
    this.cdr.detectChanges();
  }

  prev(): void {
    if (this.featuredAds.length <= 1) return;
    this.currentIndex = this.currentIndex === 0 
      ? this.featuredAds.length - 1 
      : this.currentIndex - 1;
    this.cdr.detectChanges();
  }

  goToSlide(index: number): void {
    if (index !== this.currentIndex && !this.loading) {
      this.currentIndex = index;
      this.cdr.detectChanges();
    }
  }

  navigateToAd(ad: FeaturedAd): void {
    if (!this.loading) {
      this.router.navigate([ad.link]);
    }
  }
}
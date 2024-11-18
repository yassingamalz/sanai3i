// featured-slider.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FeaturedSliderService } from '../../../../core/services/featured-slider.service';
import { FeaturedAd } from '../../../../shared/interfaces/featured-slider.interface';

@Component({
  selector: 'app-featured-slider',
  templateUrl: './featured-slider.component.html',
  styleUrls: ['./featured-slider.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class FeaturedSliderComponent implements OnInit, OnDestroy {
  @ViewChild('slidesContainer')
  slidesContainer!: ElementRef;
  
  featuredAds: FeaturedAd[] = [];
  currentIndex = 0;
  loading = true;
  direction: 'next' | 'prev' = 'next';
  touchStartX: number = 0;
  touchEndX: number = 0;
  isSwiping: boolean = false;
  swipeThreshold: number = 50; // minimum distance for swipe
  
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

  // Touch Event Handlers
  onTouchStart(event: TouchEvent): void {
    this.autoSlideEnabled = false;
    this.touchStartX = event.touches[0].clientX;
    this.isSwiping = true;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isSwiping) return;
    
    this.touchEndX = event.touches[0].clientX;
    const deltaX = this.touchEndX - this.touchStartX;
    
    // Optional: Add visual feedback during swipe
    if (Math.abs(deltaX) > 20) {
      event.preventDefault(); // Prevent page scrolling while swiping
      // You could add a transform here for real-time feedback
      // this.slidesContainer.nativeElement.style.transform = `translateX(${deltaX}px)`;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isSwiping) return;
    
    const deltaX = this.touchEndX - this.touchStartX;
    
    if (Math.abs(deltaX) > this.swipeThreshold) {
      if (deltaX > 0 && this.currentIndex > 0) {
        // Swipe right - go to previous
        this.direction = 'prev';
        this.currentIndex--;
      } else if (deltaX < 0 && this.currentIndex < this.featuredAds.length - 1) {
        // Swipe left - go to next
        this.direction = 'next';
        this.currentIndex++;
      }
    }

    this.isSwiping = false;
    this.autoSlideEnabled = true;
    this.cdr.detectChanges();
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
          this.direction = 'next';
          this.currentIndex = (this.currentIndex + 1) % this.featuredAds.length;
          this.cdr.detectChanges();
        }
      });
  }

  goToSlide(index: number): void {
    if (index !== this.currentIndex && !this.loading) {
      this.direction = index > this.currentIndex ? 'next' : 'prev';
      this.currentIndex = index;
      this.cdr.detectChanges();
    }
  }

  navigateToAd(ad: FeaturedAd): void {
    if (!this.loading && !this.isSwiping) {
      this.router.navigate([ad.link]);
    }
  }
}
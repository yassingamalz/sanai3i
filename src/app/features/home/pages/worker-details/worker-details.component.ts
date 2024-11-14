import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WorkerService } from '../../../../core/services/worker.service';
import { Worker } from '../../../../shared/interfaces/worker.interface';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ 
        opacity: 0, 
        transform: 'translateY(10px)' 
      })),
      state('*', style({ 
        opacity: 1, 
        transform: 'translateY(0)' 
      })),
      transition('void => *', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class WorkerDetailsComponent implements OnInit, OnDestroy {
  workerId: number = 0;
  worker?: Worker;
  activeTab: 'services' | 'reviews' = 'services';
  isLoading = true;
  showContent = false;
  private destroy$ = new Subject<void>();

  constructor(
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private router: Router,
    private workerService: WorkerService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);
    this.workerId = Number(this.route.snapshot.params['id']);
    this.loadWorkerDetails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadWorkerDetails(): void {
    this.isLoading = true;
    this.showContent = false;

    this.workerService.getWorkerById(this.workerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (worker) => {
          this.worker = worker;
          this.isLoading = false;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              this.showContent = true;
            });
          });
        },
        error: (error) => {
          console.error('Error loading worker details:', error);
          this.isLoading = false;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  async onShare(): Promise<void> {
    if (!this.worker) return;

    if (navigator.share) {
      await navigator.share({
        title: this.worker.name,
        text: `${this.worker.name} - ${this.worker.service}`,
        url: window.location.href
      });
    }
  }

  onAddToFavorites(): void {
    if (!this.worker) return;
    this.workerService.toggleFavorite(this.worker.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  switchTab(tab: 'services' | 'reviews'): void {
    this.activeTab = tab;
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  onContactClick(): void {
    if (this.worker) {
      this.router.navigate(['/chat', this.workerId]);
    }
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subject, combineLatest, of } from 'rxjs';
import { takeUntil, switchMap, map, catchError } from 'rxjs/operators';
import { RequestDataService } from '../../../../core/services/request.service';
import { ServiceRequest, RequestStatus, PaymentMethod } from '../../../../shared/interfaces/request.interface';
import { WorkerService } from '../../../../core/services/worker.service';
import { Worker } from '../../../../shared/interfaces/worker.interface';

interface CostBreakdown {
  basePrice: number;
  vat: number;
  serviceFee: number;
  discount: number;
  total: number;
}

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  request: ServiceRequest | null = null;
  worker: Worker | null = null;
  costBreakdown: CostBreakdown | null = null;

  isLoading = true;
  error: string | null = null;
  isTrackingActive = false;
  imageLoadingStates: { [key: string]: boolean } = {};
  expandedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestDataService,
    private workerService: WorkerService
  ) {}

  ngOnInit(): void {
    this.loadRequestData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadRequestData(): void {
    this.route.params.pipe(
      map(params => Number(params['id'])),
      switchMap(requestId => this.requestService.getRequest(requestId).pipe(
        switchMap(request => {
          if (request.workerId) {
            // If there's a worker ID, fetch the worker and return both request and worker
            return this.workerService.getWorkerById(request.workerId).pipe(
              map(worker => ({ request, worker }))
            );
          }
          // If no worker ID, return just the request with no worker
          return of({ request, worker: null });
        })
      )),
      takeUntil(this.destroy$),
      catchError(error => {
        this.handleError('Failed to load request details');
        return EMPTY;
      })
    ).subscribe({
      next: ({ request, worker }) => {
        this.request = request;
        this.worker = worker;
        this.calculateCosts();
        this.initializeImageStates();
        this.isLoading = false;
      },
      error: (error) => {
        this.handleError('An error occurred while loading the request details');
        this.isLoading = false;
      }
    });
  }

  private calculateCosts(): void {
    if (this.request?.estimatedCost) {
      const basePrice = this.request.estimatedCost;
      const vat = this.requestService.calculateVAT(basePrice);
      const serviceFee = this.requestService.getServiceFee();
      const discount = this.requestService.getDiscount();

      this.costBreakdown = {
        basePrice,
        vat,
        serviceFee,
        discount,
        total: this.requestService.calculateTotalCost(basePrice, vat, serviceFee, discount)
      };
    }
  }

  private initializeImageStates(): void {
    if (this.request?.images) {
      this.request.images.forEach(image => {
        this.imageLoadingStates[image] = true;
      });
    }
  }

  handleAction(action: 'call' | 'chat' | 'support' | 'cancel'): void {
    try {
      switch (action) {
        case 'call':
          if (this.worker?.name) {
            console.log('Calling worker:', this.worker.name);
          }
          break;

        case 'chat':
          if (this.request?.id) {
            this.router.navigate(['/chat'], { 
              queryParams: { requestId: this.request.id } 
            });
          }
          break;

        case 'support':
          console.log('Contacting support...');
          break;

        case 'cancel':
          if (confirm('هل أنت متأكد من إلغاء الطلب؟')) {
            this.cancelRequest();
          }
          break;
      }
    } catch (error) {
      this.handleError('Failed to perform action');
    }
  }

  private cancelRequest(): void {
    if (this.request?.id) {
      this.requestService.updateRequestStatus(this.request.id, 'cancelled' as RequestStatus)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.request!.status = 'cancelled' as RequestStatus;
          },
          error: () => {
            this.handleError('Failed to cancel request');
          }
        });
    }
  }

  getStatusLabel(status: RequestStatus | undefined): string {
    if (!status) return 'قيد الانتظار';
    return this.requestService.getStatusDetails(status).label;
  }

  getStatusClass(status: RequestStatus | undefined): string {
    if (!status) return 'status-pending';
    const statusConfig = this.requestService.getStatusDetails(status);
    return `status-${statusConfig.color}`;
  }

  getPaymentMethodLabel(method: PaymentMethod | undefined): string {
    if (!method) return 'نقدي';
    const methodConfig = this.requestService.paymentMethods.find(m => m.id === method);
    return methodConfig?.name || 'نقدي';
  }

  toggleTracking(): void {
    this.isTrackingActive = !this.isTrackingActive;
    // Implement actual tracking logic here
    console.log('Tracking toggled:', this.isTrackingActive);
  }

  onImageLoad(imageUrl: string): void {
    this.imageLoadingStates[imageUrl] = false;
  }

  handleImageError(imageUrl: string): void {
    this.imageLoadingStates[imageUrl] = false;
    if (this.request?.images) {
      this.request.images = this.request.images.map(img => 
        img === imageUrl ? '/assets/images/placeholder.jpg' : img
      );
    }
  }

  expandImage(imageUrl: string): void {
    this.expandedImage = imageUrl;
  }

  closeExpandedImage(): void {
    this.expandedImage = null;
  }

  goBack(): void {
    this.router.navigate(['/requests']);
  }

  private handleError(message: string): void {
    this.error = message;
    console.error(message);
  }

  trackByFn(index: number): number {
    return index;
  }

  get showTrackingButton(): boolean {
    return this.request?.status === 'inProgress';
  }

  get canCancel(): boolean {
    return this.request?.status === 'pending' || 
           this.request?.status === 'accepted';
  }

  get isRequestActive(): boolean {
    return Boolean(
      this.request?.status === 'pending' || 
      this.request?.status === 'accepted' || 
      this.request?.status === 'inProgress'
    );
  }
}
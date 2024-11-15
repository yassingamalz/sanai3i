import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

enum RequestStatus {
  Pending = 'pending',
  InProgress = 'inProgress',
  Completed = 'completed',
  Cancelled = 'cancelled',
  Accepted = 'accepted',
  Draft = 'draft'
}

enum PaymentMethod {
  Cash = 'cash',
  Card = 'card'
}

interface Worker {
  id: number;
  name: string;
  rating: number;
  completedJobs: number;
  image: string;
  bio: string;
  responseRate: string;
  completionRate: string;
}

interface RequestLocation {
  address: string;
  coordinates: [number, number];
}

interface CostBreakdown {
  basePrice: number;
  vat: number;
  serviceFee: number;
  discount: number;
  total: number;
}

interface ServiceRequest {
  id: number;
  service: string;
  category: string;
  description: string;
  location: RequestLocation;
  scheduledDate: string;
  scheduledTime: string;
  estimatedCost: number;
  paymentMethod: PaymentMethod;
  images: string[];
  status: RequestStatus;
  worker?: Worker;
}

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  request: ServiceRequest | null = null;
  costBreakdown: CostBreakdown = {
    basePrice: 0,
    vat: 0,
    serviceFee: 10,
    discount: 15,
    total: 0
  };

  readonly RequestStatus = RequestStatus; // For template usage
  readonly PaymentMethod = PaymentMethod; // For template usage

  isLoading = true;
  error: string | null = null;
  isTrackingActive = false;
  imageLoadingStates: { [key: string]: boolean } = {};
  expandedImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMockData();
    this.initializeImageStates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMockData(): void {
    this.request = {
      id: 123,
      service: 'كهرباء',
      category: 'electrician',
      description: 'تركيب مروحة سقف في غرفة المعيشة',
      location: {
        address: 'شارع التحرير، القاهرة',
        coordinates: [30.0444, 31.2357]
      },
      scheduledDate: '2024-11-15',
      scheduledTime: '14:30',
      estimatedCost: 150,
      paymentMethod: PaymentMethod.Cash,
      images: [
        '/api/placeholder/200/200',
        '/api/placeholder/200/200',
        '/api/placeholder/200/200'
      ],
      status: RequestStatus.InProgress,
      worker: {
        id: 1,
        name: 'عم حسن',
        rating: 4.8,
        completedJobs: 195,
        image: '/api/placeholder/64/64',
        bio: 'فني كهرباء محترف مع خبرة 15 عام',
        responseRate: '95%',
        completionRate: '98%'
      }
    };

    this.calculateCosts();
    this.isLoading = false;
  }

  private calculateCosts(): void {
    if (this.request?.estimatedCost) {
      const basePrice = this.request.estimatedCost;
      const vat = basePrice * 0.14;
      const serviceFee = 10;
      const discount = 15;

      this.costBreakdown = {
        basePrice,
        vat,
        serviceFee,
        discount,
        total: basePrice + vat + serviceFee - discount
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

  trackByFn(index: number): number {
    return index;
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

  getStatusClass(status: RequestStatus | undefined): string {
    if (!status) return 'status-pending';
    
    const statusClasses: Record<RequestStatus, string> = {
      [RequestStatus.Pending]: 'status-pending',
      [RequestStatus.InProgress]: 'status-in-progress',
      [RequestStatus.Completed]: 'status-completed',
      [RequestStatus.Cancelled]: 'status-cancelled',
      [RequestStatus.Accepted]: 'status-accepted',
      [RequestStatus.Draft]: 'status-draft'
    };
    
    return statusClasses[status];
  }

  getStatusLabel(status: RequestStatus | undefined): string {
    if (!status) return 'قيد الانتظار';
    
    const statusLabels: Record<RequestStatus, string> = {
      [RequestStatus.Pending]: 'قيد الانتظار',
      [RequestStatus.InProgress]: 'جاري التنفيذ',
      [RequestStatus.Completed]: 'مكتمل',
      [RequestStatus.Cancelled]: 'ملغي',
      [RequestStatus.Accepted]: 'مقبول',
      [RequestStatus.Draft]: 'مسودة'
    };
    
    return statusLabels[status];
  }

  getPaymentMethodLabel(method: PaymentMethod | undefined): string {
    if (!method) return 'نقدي';
    
    const methodLabels: Record<PaymentMethod, string> = {
      [PaymentMethod.Cash]: 'نقدي',
      [PaymentMethod.Card]: 'بطاقة ائتمان'
    };
    
    return methodLabels[method];
  }

  goBack(): void {
    this.router.navigate(['/requests']);
  }

  handleAction(action: 'call' | 'chat' | 'support' | 'cancel'): void {
    try {
      switch (action) {
        case 'call':
          if (this.request?.worker?.name) {
            console.log('Calling worker:', this.request.worker.name);
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
    if (this.request) {
      this.request.status = RequestStatus.Cancelled;
      console.log('Request cancelled:', this.request.id);
    }
  }

  toggleTracking(): void {
    this.isTrackingActive = !this.isTrackingActive;
    console.log('Tracking toggled:', this.isTrackingActive);
  }

  expandImage(imageUrl: string): void {
    this.expandedImage = imageUrl;
  }

  closeExpandedImage(): void {
    this.expandedImage = null;
  }

  private handleError(message: string): void {
    this.error = message;
    console.error(message);
  }

  get showTrackingButton(): boolean {
    return this.request?.status === RequestStatus.InProgress;
  }

  get canCancel(): boolean {
    return this.request?.status === RequestStatus.Pending || 
           this.request?.status === RequestStatus.Accepted;
  }

  get isRequestActive(): boolean {
    return Boolean(
      this.request?.status === RequestStatus.Pending || 
      this.request?.status === RequestStatus.Accepted || 
      this.request?.status === RequestStatus.InProgress
    );
  }
}
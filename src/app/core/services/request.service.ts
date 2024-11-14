import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ServiceRequest, RequestStep, RequestStatus, PaymentDetails } from '../../shared/interfaces/request.interface';
@Injectable({
  providedIn: 'root'
})
export class RequestDataService {
  private currentRequest = new BehaviorSubject<Partial<ServiceRequest>>({});

  readonly steps: RequestStep[] = [
    { id: 1, title: 'نوع الخدمة', subtitle: 'اختر الخدمة المطلوبة', icon: 'tools', completed: false },
    { id: 2, title: 'التفاصيل', subtitle: 'اضف وصف المشكلة والصور', icon: 'image', completed: false },
    { id: 3, title: 'الموقع والوقت', subtitle: 'حدد الموقع وموعد الخدمة', icon: 'map-marker', completed: false },
    { id: 4, title: 'الدفع', subtitle: 'اختر طريقة الدفع المناسبة', icon: 'credit-card', completed: false }
  ];

  private readonly mockRequests: ServiceRequest[] = [
    {
      id: 1,
      category: 'electrician',
      service: 'تصليح تكيف',
      description: 'تكييف لا يبرد بشكل جيد',
      location: {
        address: 'المعادي، القاهرة',
        coordinates: [30.0444, 31.2357]
      },
      scheduledDate: '2024-11-14',
      scheduledTime: '14:00',
      images: ['/api/placeholder/200/200'],
      estimatedCost: 250,
      paymentMethod: 'cash',
      status: 'pending',
      createdAt: '2024-11-14T10:00:00',
      customerId: 1
    },
    {
      id: 2,
      category: 'plumber',
      service: 'سباكه',
      description: 'تسريب مياه في المطبخ',
      location: {
        address: 'مدينة نصر، القاهرة',
        coordinates: [30.0511, 31.2497]
      },
      scheduledDate: '2024-11-14',
      scheduledTime: '16:00',
      images: ['/api/placeholder/200/200'],
      estimatedCost: 150,
      paymentMethod: 'card',
      status: 'inProgress',
      createdAt: '2024-11-14T09:00:00',
      customerId: 1,
      workerId: 2
    }
  ];

  readonly categories = [
    {
      id: 'electrician',
      name: 'كهربائي',
      icon: '⚡',
      services: [
        { id: 'general', name: 'صيانة عامة', basePrice: 150 },
        { id: 'ac', name: 'تصليح تكييف', basePrice: 200 },
        { id: 'appliances', name: 'تصليح أجهزة', basePrice: 180 }
      ]
    },
    {
      id: 'plumber',
      name: 'سباك',
      icon: '🔧',
      services: [
        { id: 'general', name: 'صيانة عامة', basePrice: 120 },
        { id: 'emergency', name: 'طوارئ', basePrice: 250 }
      ]
    }
  ];

  readonly statusConfig: Record<RequestStatus, { label: string; color: string; icon: string }> = {
    draft: { label: 'مسودة', color: 'gray', icon: 'draft' },
    pending: { label: 'قيد الانتظار', color: 'yellow', icon: 'clock' },
    accepted: { label: 'مقبول', color: 'blue', icon: 'check' },
    inProgress: { label: 'جاري التنفيذ', color: 'blue', icon: 'spinner' },
    completed: { label: 'مكتمل', color: 'green', icon: 'check-circle' },
    cancelled: { label: 'ملغي', color: 'red', icon: 'times-circle' }
  };

  readonly paymentMethods = [
    { id: 'cash' as const, name: 'نقدي', icon: 'money-bill' },
    { id: 'card' as const, name: 'بطاقة ائتمان', icon: 'credit-card' }
  ];

  constructor() {}

  // Request Management
  getCurrentRequest(): Observable<Partial<ServiceRequest>> {
    return this.currentRequest.asObservable();
  }

  updateCurrentRequest(request: Partial<ServiceRequest>): void {
    this.currentRequest.next({
      ...this.currentRequest.value,
      ...request
    });
  }

  getRequests(status?: RequestStatus): Observable<ServiceRequest[]> {
    let filteredRequests = this.mockRequests;
    if (status) {
      filteredRequests = this.mockRequests.filter(r => r.status === status);
    }
    return of(filteredRequests);
  }

  createRequest(request: ServiceRequest): Observable<ServiceRequest> {
    const newRequest = {
      ...request,
      id: this.mockRequests.length + 1,
      createdAt: new Date().toISOString(),
      status: 'pending' as RequestStatus
    };
    return of(newRequest);
  }

  // Utility Methods
  calculateEstimatedCost(category: string, service: string): number {
    const categoryData = this.categories.find(c => c.id === category);
    const serviceData = categoryData?.services.find(s => s.id === service);
    const basePrice = serviceData?.basePrice || 0;
    return Math.round(basePrice + (Math.random() * 50)); 
  }

  getAvailableTimeSlots(date: string): string[] {
    return [
      '09:00', '10:00', '11:00', '12:00', '13:00', 
      '14:00', '15:00', '16:00', '17:00', '18:00'
    ];
  }

  validateStep(step: number, data: Partial<ServiceRequest>): boolean {
    const validations = {
      1: () => Boolean(data.category && data.service),
      2: () => Boolean(data.description!.length >= 20),
      3: () => Boolean(data.location && data.scheduledDate && data.scheduledTime),
      4: () => Boolean(data.paymentMethod)
    };
    return validations[step as keyof typeof validations]?.() || false;
  }

  getStatusDetails(status: RequestStatus) {
    return this.statusConfig[status];
  }

  processPayment(payment: PaymentDetails): Observable<boolean> {
    return of(true);
  }

  getServicesByCategory(categoryId: string) {
    return this.categories.find(c => c.id === categoryId)?.services || [];
  }
}
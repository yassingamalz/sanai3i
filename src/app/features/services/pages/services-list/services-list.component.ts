import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

interface ServiceProposal {
  id: number;
  service: string;
  location: string;
  distance: string;
  cost: number;
  description: string;
  time: string;
  date: string;
  rating: number;
  completedJobs: number;
  status: 'pending' | 'inProgress' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
handleAction(_t24: ServiceProposal) {
throw new Error('Method not implemented.');
}
getActionLabel(arg0: any) {
throw new Error('Method not implemented.');
}
getActionIcon(arg0: any) {
throw new Error('Method not implemented.');
}
  currentStatus: string = 'inProgress';
  
  orderStatuses = [
    { id: 'all', label: 'الكل', icon: 'fas fa-list', count: 5 },
    { id: 'pending', label: 'قيد الانتظار', icon: 'fas fa-clock', count: 2 },
    { id: 'inProgress', label: 'جاري التنفيذ', icon: 'fas fa-spinner', count: 2 },
    { id: 'completed', label: 'مكتملة', icon: 'fas fa-check-circle', count: 1 }
  ];

  proposals: ServiceProposal[] = [
    {
      id: 1,
      service: 'تصليح تكييف',
      location: 'المعادي، القاهرة',
      distance: '2.5',
      cost: 350,
      description: 'تكييف لا يبرد بشكل جيد',
      time: '15:30',
      date: '2024-11-12',
      rating: 4.8,
      completedJobs: 120,
      status: 'inProgress'
    },
    {
      id: 2,
      service: 'صيانة عامة',
      location: 'مدينة نصر، القاهرة',
      distance: '4.2',
      cost: 250,
      description: 'صيانة دورية',
      time: '14:00',
      date: '2024-11-12',
      rating: 4.5,
      completedJobs: 85,
      status: 'pending'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Initialize with filtered data if needed
  }

  get userType() {
    return this.authService.getCurrentUser()?.type;
  }

  get pageTitle() {
    return this.userType === 'worker' ? 'خدماتي' : 'طلباتي';
  }

  get actionButtonLabel() {
    return this.userType === 'worker' ? 'قبول الطلب' : 'تفاصيل الطلب';
  }

  setStatus(status: string) {
    this.currentStatus = status;
    // Implement filtering logic here
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-4 py-2 text-sm font-medium flex items-center justify-end gap-2';
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-50 text-yellow-700`;
      case 'inProgress':
        return `${baseClasses} bg-blue-50 text-blue-700`;
      case 'completed':
        return `${baseClasses} bg-green-50 text-green-700`;
      case 'cancelled':
        return `${baseClasses} bg-red-50 text-red-700`;
      default:
        return baseClasses;
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending':
        return 'fas fa-clock text-yellow-500';
      case 'inProgress':
        return 'fas fa-spinner fa-spin text-blue-500';
      case 'completed':
        return 'fas fa-check-circle text-green-500';
      case 'cancelled':
        return 'fas fa-times-circle text-red-500';
      default:
        return 'fas fa-circle';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'inProgress':
        return 'جاري التنفيذ';
      case 'completed':
        return 'مكتملة';
      case 'cancelled':
        return 'ملغية';
      default:
        return '';
    }
  }

  getActionButtonIcon(): string {
    return this.userType === 'worker' ? 'fas fa-check' : 'fas fa-info-circle';
  }

  openNewRequest() {
    // Implement new request logic
  }

  openFilters() {
    // Implement filters logic
  }
}
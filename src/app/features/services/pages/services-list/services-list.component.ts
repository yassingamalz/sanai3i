import { Component } from '@angular/core';
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
}

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html'
})
export class ServicesListComponent {
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
      completedJobs: 120
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
      completedJobs: 85
    }
  ];

  constructor(private authService: AuthService) {}

  get userType() {
    return this.authService.getCurrentUser()?.type;
  }

  get pageTitle() {
    return this.userType === 'worker' ? 'خدماتي' : 'طلباتي';
  }

  get actionButtonLabel() {
    return this.userType === 'worker' ? 'قبول الطلب' : 'تفاصيل الطلب';
  }
}
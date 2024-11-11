import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  service: string;
  rating?: number;
  isWorker?: boolean;
  address?: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  private customerMessages: Message[] = [
    { 
      id: 1, 
      name: 'عم حسن', 
      message: 'حاكون عندك خلال ساعة', 
      time: '12:30', 
      unread: 2,
      service: 'كهربائي',
      rating: 4.8,
      isWorker: true
    },
    { 
      id: 2, 
      name: 'أستاذ محمد', 
      message: 'شكراً على تقييمك', 
      time: '11:45', 
      unread: 0,
      service: 'سباك',
      rating: 4.9,
      isWorker: true
    }
  ];

  private workerMessages: Message[] = [
    {
      id: 1,
      name: 'أحمد محمد',
      message: 'متى يمكنك القدوم؟',
      time: '12:30',
      unread: 1,
      address: 'المعادي، القاهرة',
      service: 'تصليح تكييف'
    },
    {
      id: 2,
      name: 'محمود علي',
      message: 'اريد صيانة عامة للمنزل',
      time: '11:45',
      unread: 0,
      address: 'مدينة نصر، القاهرة',
      service: 'صيانة عامة'
    }
  ];

  constructor(private authService: AuthService) {}

  get userType() {
    return this.authService.getCurrentUser()?.type;
  }

  get displayMessages(): Message[] {
    return this.userType === 'worker' ? this.workerMessages : this.customerMessages;
  }

  isWorkerView(): boolean {
    return this.userType === 'worker';
  }

  hasRating(message: Message): boolean {
    return message.rating !== undefined && message.isWorker === true;
  }

  hasAddress(message: Message): boolean {
    return message.address !== undefined;
  }
}
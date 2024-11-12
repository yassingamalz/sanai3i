import { Component, OnInit } from '@angular/core';

interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  service: string;
  image: string;
  rating?: number;
  isWorker?: boolean;
  status?: string;
  isOnline?: boolean;
  jobCount?: number;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  searchQuery: string = '';
  
  filters = [
    { id: 'all', label: 'الكل', active: true },
    { id: 'unread', label: 'غير مقروءة', active: false },
    { id: 'read', label: 'مقروءة', active: false }
  ];

  messages: Message[] = [
    { 
      id: 1, 
      name: 'عم حسن', 
      message: 'حاكون عندك خلال ساعة', 
      time: '12:30', 
      unread: 2,
      service: 'كهربائي',
      rating: 4.8,
      isWorker: true,
      image: '/api/placeholder/48/48',
      status: 'online',
      isOnline: true,
      jobCount: 230
    },
    { 
      id: 2, 
      name: 'أستاذ محمد', 
      message: 'شكراً على تقييمك', 
      time: '11:45', 
      unread: 0,
      service: 'سباك',
      rating: 4.9,
      isWorker: true,
      image: '/api/placeholder/48/48',
      jobCount: 180
    },
    { 
      id: 3, 
      name: 'الحاج كريم', 
      message: 'يمكنني الحضور غداً في الصباح', 
      time: 'أمس', 
      unread: 1,
      service: 'نقاش',
      rating: 4.7,
      isWorker: true,
      image: '/api/placeholder/48/48',
      isOnline: false,
      jobCount: 150
    }
  ];

  ngOnInit() {
    // Initial setup if needed
  }

  setActiveFilter(filterId: string) {
    this.filters = this.filters.map(filter => ({
      ...filter,
      active: filter.id === filterId
    }));
  }

  get filteredMessages(): Message[] {
    const activeFilter = this.filters.find(f => f.active)?.id;
    
    let filtered = this.messages;
    
    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter(message => 
        message.name.includes(this.searchQuery) ||
        message.message.includes(this.searchQuery) ||
        message.service.includes(this.searchQuery)
      );
    }
    
    // Apply status filter
    if (activeFilter === 'unread') {
      filtered = filtered.filter(message => message.unread > 0);
    } else if (activeFilter === 'read') {
      filtered = filtered.filter(message => !message.unread);
    }
    
    return filtered;
  }

  getTotalUnreadCount(): number {
    return this.messages.reduce((total, message) => total + (message.unread || 0), 0);
  }
}
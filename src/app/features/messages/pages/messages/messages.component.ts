import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ChatThread, MessageService } from '../../../../core/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  searchQuery: string = '';
  threads: ChatThread[] = [];
  loading: boolean = true;
  
  filters = [
    { id: 'all', label: 'الكل', active: true },
    { id: 'unread', label: 'غير مقروءة', active: false },
    { id: 'active', label: 'نشط', active: false },
    { id: 'archived', label: 'مؤرشف', active: false }
  ];

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadThreads();
    this.setupSearchSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredThreads(): ChatThread[] {
    if (!this.searchQuery.trim()) return this.threads;
    
    return this.threads.filter(thread => 
      thread.worker.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      thread.worker.service.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      thread.lastMessage.content.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  private loadThreads() {
    this.loading = true;
    const activeFilter = this.filters.find(f => f.active)?.id;
    
    this.messageService.getThreads(activeFilter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (threads) => {
          this.threads = threads;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading threads:', error);
          this.loading = false;
        }
      });
  }

  private setupSearchSubscription() {
    this.messageService.searchThreads(this.searchQuery)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(threads => {
        this.threads = threads;
      });
  }

  setActiveFilter(filterId: string) {
    this.filters = this.filters.map(filter => ({
      ...filter,
      active: filter.id === filterId
    }));
    this.loadThreads();
  }

  formatTimestamp(date: Date): string {
    const messageDate = new Date(date);
    const now = new Date();
    const diff = now.getTime() - messageDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `منذ ${minutes} دقيقة`;
      }
      return `منذ ${hours} ساعة`;
    }
    if (days === 1) return 'أمس';
    if (days <= 7) return `منذ ${days} أيام`;
    return messageDate.toLocaleDateString('ar-EG');
  }

  openThread(thread: ChatThread) {
    this.messageService.markAsRead(thread.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/messages', thread.id]);
      });
  }

  archiveThread(threadId: number, event: Event) {
    event.stopPropagation();
    this.messageService.archiveThread(threadId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadThreads();
      });
  }

  getTotalUnreadCount(): number {
    return this.threads.reduce((sum, thread) => sum + thread.unreadCount, 0);
  }

  trackByThreadId(index: number, thread: ChatThread): number {
    return thread.id;
  }
}
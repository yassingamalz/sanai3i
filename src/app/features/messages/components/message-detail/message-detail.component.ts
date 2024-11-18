import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { takeUntil, debounceTime, map } from 'rxjs/operators';
import { ChatThread, Message, MessageService } from '../../../../core/services/message.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  private destroy$ = new Subject<void>();
  private shouldScrollToBottom = false;
  private typingTimeout: any;
  private workerTypingTimer?: any;

  thread?: ChatThread;
  messages: Message[] = [];
  newMessage: string = '';
  currentUserId: number = 1;
  loading: boolean = true;
  error: string | null = null;
  isTyping: boolean = false;
  workerIsTyping: boolean = false;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) { }


  ngOnInit() {
    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);

    this.route.params.pipe(
      takeUntil(this.destroy$),
      map(params => +params['id'])
    ).subscribe({
      next: (threadId) => {
        // Reset states
        this.loading = true;
        this.error = null;
        this.messages = [];
        this.workerIsTyping = false;
        this.clearTypingTimers();

        // Load thread data
        this.loadThread(threadId);

        // Subscribe to typing status
        this.messageService.getTypingStatus$().pipe(
          takeUntil(this.destroy$),
          map(statuses => statuses.some(s =>
            s.threadId === threadId &&
            s.isTyping &&
            s.userId !== this.currentUserId
          ))
        ).subscribe({
          next: (isTyping) => {
            this.workerIsTyping = isTyping;
            if (isTyping) {
              this.simulateWorkerTyping();
            }
          },
          error: (error) => {
            console.error('Error in typing status subscription:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error in route params subscription:', error);
        this.error = 'حدث خطأ في تحميل المحادثة';
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearTypingTimers();
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private clearTypingTimers() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    if (this.workerTypingTimer) {
      clearTimeout(this.workerTypingTimer);
    }
  }

  loadThread(threadId: number) {
    this.loading = true;
    this.error = null;

    this.messageService.getThread(threadId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (thread) => {
        if (!thread) {
          this.error = 'المحادثة غير موجودة';
          this.loading = false;
          return;
        }
        this.thread = thread;
        this.loadMessages(threadId);
      },
      error: (error) => {
        console.error('Error loading thread:', error);
        this.error = 'حدث خطأ أثناء تحميل المحادثة';
        this.loading = false;
      }
    });
  }

  private loadMessages(threadId: number) {
    this.messageService.getMessageHistory(threadId).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.loading = false;
        this.shouldScrollToBottom = true;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.error = 'حدث خطأ أثناء تحميل الرسائل';
        this.loading = false;
      }
    });
  }

  sendMessage() {
    if (!this.thread || !this.newMessage.trim()) return;

    // Clear typing status
    this.isTyping = false;
    this.clearTypingTimers();

    const tempMessage: Message = {
      id: Date.now(),
      senderId: this.currentUserId,
      receiverId: this.thread.workerId,
      content: this.newMessage.trim(),
      timestamp: new Date(),
      read: false,
      type: 'text'
    };

    // Optimistically add the message
    this.messages = [...this.messages, tempMessage];
    this.shouldScrollToBottom = true;
    const messageContent = this.newMessage;
    this.newMessage = '';

    // Focus input after sending
    this.messageInput.nativeElement.focus();

    this.messageService.sendMessage(this.thread.id, messageContent).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (message) => {
        // Update with the real message from server
        this.messages = this.messages.map(m =>
          m.id === tempMessage.id ? message : m
        );
        // Simulate worker typing response
        setTimeout(() => {
          this.workerIsTyping = true;
          this.simulateWorkerTyping();
        }, 1000);
      },
      error: (error) => {
        console.error('Error sending message:', error);
        // Remove the failed message
        this.messages = this.messages.filter(m => m.id !== tempMessage.id);
        this.error = 'فشل إرسال الرسالة';
      }
    });
  }

  onInputChange() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.isTyping = true;

    // Notify service if it supports typing status
    if (this.thread && this.messageService.sendTypingStatus) {
      this.messageService.sendTypingStatus(this.thread.id, true);
    }

    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
      if (this.thread && this.messageService.sendTypingStatus) {
        this.messageService.sendTypingStatus(this.thread.id, false);
      }
    }, 3000);
  }

  private simulateWorkerTyping() {
    if (this.workerIsTyping && !this.workerTypingTimer) {
      const typingDuration = Math.random() * 2000 + 2000; // 2-4 seconds
      this.workerTypingTimer = setTimeout(() => {
        this.workerIsTyping = false;
        this.workerTypingTimer = undefined;
      }, typingDuration);
    }
  }

  get messagesContainerClass(): string {
    return this.thread?.serviceRequest ? 'chat-messages has-service-banner' : 'chat-messages';
  }

  private scrollToBottom() {
    try {
      const element = this.messageContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  get messageGroups() {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';

    this.messages.forEach(message => {
      const messageDate = new Date(message.timestamp).toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groups.push({ date: messageDate, messages: [] });
      }

      groups[groups.length - 1].messages.push(message);
    });

    return groups;
  }

  get showTypingIndicator(): boolean {
    return this.workerIsTyping && !this.thread?.serviceRequest;
  }

  formatMessageTime(date: Date): string {
    return new Date(date).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  isConsecutiveMessage(currentMsg: Message, prevMsg: Message): boolean {
    if (!prevMsg) return false;

    const timeDiff = new Date(currentMsg.timestamp).getTime() -
      new Date(prevMsg.timestamp).getTime();

    return currentMsg.senderId === prevMsg.senderId &&
      timeDiff < 60000; // Messages within 1 minute
  }

  goBack() {
    this.router.navigate(['/messages']);
  }

  openAttachmentMenu() {
    // Implement attachment menu functionality
    console.log('Opening attachment menu');
  }

  blockThread() {
    if (!this.thread) return;

    if (confirm('هل أنت متأكد من حظر هذه المحادثة؟')) {
      this.messageService.blockThread(this.thread.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.router.navigate(['/messages']);
        },
        error: (error) => {
          console.error('Error blocking thread:', error);
          this.error = 'فشل حظر المحادثة';
        }
      });
    }
  }

  deleteThread() {
    if (!this.thread) return;

    if (confirm('هل أنت متأكد من حذف هذه المحادثة؟')) {
      this.messageService.deleteThread(this.thread.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.router.navigate(['/messages']);
        },
        error: (error) => {
          console.error('Error deleting thread:', error);
          this.error = 'فشل حذف المحادثة';
        }
      });
    }
  }
}
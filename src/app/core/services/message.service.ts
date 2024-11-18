import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';
import { WorkerService } from './worker.service';
import { Worker } from '../../shared/interfaces/worker.interface';

export type MessageType = 'text' | 'image' | 'location' | 'service_request';
export type ThreadStatus = 'active' | 'archived' | 'blocked';
export type ServiceRequestStatus = 'pending' | 'in_progress' | 'completed';

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
  read: boolean;
  type: MessageType;
  serviceRequestId?: number;
  attachments?: string[];
}

export interface ServiceRequest {
  id: number;
  service: string;
  status: ServiceRequestStatus;
  details?: string;
}

export interface ChatThread {
  id: number;
  workerId: number;
  lastMessage: Message;
  unreadCount: number;
  worker: Worker;
  status: ThreadStatus;
  lastActivity: Date;
  serviceRequest?: ServiceRequest;
}

export interface TypingStatus {
  threadId: number;
  userId: number;
  isTyping: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private threads = new BehaviorSubject<ChatThread[]>([]);
  private typingStatus = new BehaviorSubject<TypingStatus[]>([]);
  private typingStatusSubject = new BehaviorSubject<TypingStatus[]>([]);
  private readonly STORAGE_KEY = 'chat_threads';

  private staticMessages = {
    greeting: [
      'السلام عليكم، كيف يمكنني مساعدتك؟',
      'أهلاً بك، هل تحتاج إلى خدمة معينة؟',
      'مرحباً، أنا متواجد للمساعدة'
    ],
    service: [
      'سيكون السعر حوالي {price} جنيه. هل يناسبك هذا؟',
      'يمكنني القدوم غداً في الصباح. هل هذا مناسب؟',
      'سأحتاج حوالي ساعتين لإنهاء العمل'
    ],
    confirmation: [
      'تم تأكيد الموعد ليوم {date}',
      'سأصل في الموعد المحدد إن شاء الله',
      'شكراً لثقتك، سأكون عند حسن ظنك'
    ],
    completion: [
      'تم إنجاز العمل بحمد الله',
      'أتمنى أن تكون راضياً عن الخدمة',
      'يمكنك تقييم الخدمة من خلال التطبيق'
    ],
    negotiation: [
      'هل يمكننا الاتفاق على {price} جنيه؟',
      'السعر قابل للتفاوض',
      'يمكنني تقديم خصم 10% إذا تم الحجز اليوم'
    ]
  };

  private staticServiceRequests: ServiceRequest[] = [
    {
      id: 1,
      service: 'صيانة تكييف',
      status: 'pending',
      details: 'تنظيف وصيانة دورية'
    },
    {
      id: 2,
      service: 'سباكة',
      status: 'in_progress',
      details: 'إصلاح تسريب مياه'
    },
    {
      id: 3,
      service: 'كهرباء',
      status: 'completed',
      details: 'تركيب مصابيح LED'
    }
  ];

  constructor(private workerService: WorkerService) {
    this.loadInitialThreads();
  }

  private async loadInitialThreads() {
    const workers = await this.workerService.getWorkers().toPromise();
    const initialThreads: ChatThread[] = workers!.slice(0, 5).map((worker, index) => ({
      id: index + 1,
      workerId: worker.id,
      worker: worker,
      unreadCount: Math.floor(Math.random() * 3),
      status: 'active',
      lastActivity: new Date(Date.now() - Math.random() * 86400000 * 5),
      lastMessage: this.createInitialMessage(worker),
      serviceRequest: this.getRandomServiceRequest()
    }));

    this.threads.next(initialThreads);
  }

  getTypingStatus$(): Observable<TypingStatus[]> {
    return this.typingStatusSubject.asObservable();
  }

  sendTypingStatus(threadId: number, isTyping: boolean): void {
    const currentStatuses = this.typingStatus.value.filter(
      s => s.threadId !== threadId || s.userId !== 1
    );

    if (isTyping) {
      currentStatuses.push({ threadId, userId: 1, isTyping });
    }

    this.typingStatus.next(currentStatuses);

    if (isTyping) {
      setTimeout(() => {
        this.sendTypingStatus(threadId, false);
      }, 3000);
    }
  }

  sendMessage(threadId: number, content: string): Observable<Message> {
    const newMessage: Message = {
      id: Date.now(),
      senderId: 1,
      receiverId: threadId,
      content,
      timestamp: new Date(),
      read: false,
      type: 'text'
    };

    const currentThreads = this.threads.value;
    const threadIndex = currentThreads.findIndex(t => t.id === threadId);

    if (threadIndex !== -1) {
      const updatedThreads = [...currentThreads];
      updatedThreads[threadIndex] = {
        ...updatedThreads[threadIndex],
        lastMessage: newMessage,
        lastActivity: new Date()
      };
      this.threads.next(updatedThreads);

      // Simulate worker typing response
      setTimeout(() => {
        const typingStatus = {
          threadId,
          userId: updatedThreads[threadIndex].workerId,
          isTyping: true
        };
        this.typingStatus.next([...this.typingStatus.value, typingStatus]);

        // Simulate response after typing
        setTimeout(() => {
          this.simulateWorkerResponse(threadId, updatedThreads[threadIndex]);
          this.typingStatus.next(
            this.typingStatus.value.filter(s =>
              s.threadId !== threadId || s.userId !== updatedThreads[threadIndex].workerId
            )
          );
        }, Math.random() * 2000 + 1000);
      }, 500);
    }

    return of(newMessage).pipe(delay(300));
  }

  private simulateWorkerResponse(threadId: number, thread: ChatThread): void {
    const messageType = this.getMessageType(thread);
    const content = this.staticMessages[messageType][
      Math.floor(Math.random() * this.staticMessages[messageType].length)
    ].replace('{price}', (Math.floor(Math.random() * 500) + 100).toString())
      .replace('{date}', this.getRandomFutureDate());

    const response: Message = {
      id: Date.now(),
      senderId: thread.workerId,
      receiverId: 1,
      content,
      timestamp: new Date(),
      read: false,
      type: 'text'
    };

    const currentThreads = this.threads.value;
    const threadIndex = currentThreads.findIndex(t => t.id === threadId);

    if (threadIndex !== -1) {
      const updatedThreads = [...currentThreads];
      updatedThreads[threadIndex] = {
        ...updatedThreads[threadIndex],
        lastMessage: response,
        lastActivity: new Date(),
        unreadCount: updatedThreads[threadIndex].unreadCount + 1
      };
      this.threads.next(updatedThreads);
    }
  }

  private createInitialMessage(worker: Worker): Message {
    const messageTypes = ['greeting', 'service', 'confirmation', 'completion', 'negotiation'];
    const type = messageTypes[Math.floor(Math.random() * messageTypes.length)];
    const messages = this.staticMessages[type as keyof typeof this.staticMessages];
    let content = messages[Math.floor(Math.random() * messages.length)];

    content = content
      .replace('{price}', (Math.floor(Math.random() * 500) + 100).toString())
      .replace('{date}', this.getRandomFutureDate());

    return {
      id: Date.now(),
      senderId: worker.id,
      receiverId: 1,
      content,
      timestamp: new Date(Date.now() - Math.random() * 86400000),
      read: Math.random() > 0.5,
      type: 'text'
    };
  }

  private getRandomServiceRequest(): ServiceRequest | undefined {
    if (Math.random() > 0.5) {
      return this.staticServiceRequests[
        Math.floor(Math.random() * this.staticServiceRequests.length)
      ];
    }
    return undefined;
  }

  getMessageHistory(threadId: number): Observable<Message[]> {
    const messages: Message[] = [];
    const thread = this.threads.value.find(t => t.id === threadId);

    if (thread) {
      const conversation = this.generateConversation(thread);
      messages.push(...conversation);

      if (thread.serviceRequest) {
        messages.push({
          id: Date.now(),
          senderId: 1,
          receiverId: thread.workerId,
          content: 'طلب خدمة جديد',
          timestamp: new Date(thread.lastActivity.getTime() - 86400000),
          read: true,
          type: 'service_request',
          serviceRequestId: thread.serviceRequest.id
        });
      }
    }

    return of(messages.sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )).pipe(delay(500));
  }

  private generateConversation(thread: ChatThread): Message[] {
    const messages: Message[] = [];
    const totalMessages = Math.floor(Math.random() * 10) + 5;
    const baseTime = new Date(Date.now() - (24 * 3600000));

    for (let i = 0; i < totalMessages; i++) {
      const isWorker = i % 2 === 0;
      const timeOffset = i * (3600000 * Math.random());

      const message = this.createConversationMessage(
        thread,
        isWorker,
        new Date(baseTime.getTime() + timeOffset)
      );
      messages.push(message);
    }

    return messages;
  }

  private createConversationMessage(thread: ChatThread, isWorker: boolean, timestamp: Date): Message {
    const messageType = this.getMessageType(thread);
    const content = isWorker
      ? this.staticMessages[messageType][Math.floor(Math.random() * this.staticMessages[messageType].length)]
      : this.getCustomerResponse(messageType);

    return {
      id: Date.now(),
      senderId: isWorker ? thread.workerId : 1,
      receiverId: isWorker ? 1 : thread.workerId,
      content: content
        .replace('{price}', (Math.floor(Math.random() * 500) + 100).toString())
        .replace('{date}', this.getRandomFutureDate()),
      timestamp,
      read: true,
      type: 'text'
    };
  }

  private getMessageType(thread: ChatThread): keyof typeof this.staticMessages {
    const types: (keyof typeof this.staticMessages)[] = [
      'greeting', 'service', 'confirmation', 'completion', 'negotiation'
    ];
    return types[Math.floor(Math.random() * types.length)];
  }

  private getCustomerResponse(type: keyof typeof this.staticMessages): string {
    const responses = {
      greeting: [
        'وعليكم السلام، نعم أحتاج مساعدة',
        'مرحباً، عندي مشكلة أريد حلها',
        'أهلاً، أريد الاستفسار عن الخدمات المتوفرة'
      ],
      service: [
        'نعم السعر مناسب',
        'هل يمكن التفاوض على السعر؟',
        'موعد الغد مناسب جداً'
      ],
      confirmation: [
        'تمام، في انتظارك',
        'شكراً لك، الموعد مؤكد',
        'أتمنى أن تكون دقيق في الموعد'
      ],
      completion: [
        'شكراً جزيلاً على العمل الممتاز',
        'الخدمة كانت ممتازة',
        'سأقوم بالتقييم حالاً'
      ],
      negotiation: [
        'حسناً، أوافق على السعر المقترح',
        'هل يمكن الدفع عند اكتمال العمل؟',
        'أقبل العرض مع الخصم'
      ]
    };

    return responses[type][Math.floor(Math.random() * responses[type].length)];
  }

  private getRandomFutureDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 7) + 1);
    return date.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getThreads(filter?: string): Observable<ChatThread[]> {
    return this.threads.pipe(
      map(threads => {
        let filtered = [...threads];
        if (filter === 'unread') {
          filtered = filtered.filter(thread => thread.unreadCount > 0);
        } else if (filter === 'active') {
          filtered = filtered.filter(thread => thread.status === 'active');
        } else if (filter === 'archived') {
          filtered = filtered.filter(thread => thread.status === 'archived');
        }
        return filtered.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
      })
    );
  }

  getThread(threadId: number): Observable<ChatThread | undefined> {
    return this.threads.pipe(
      map(threads => threads.find(t => t.id === threadId))
    );
  }
  markAsRead(threadId: number): Observable<boolean> {
    const currentThreads = this.threads.value;
    const threadIndex = currentThreads.findIndex(t => t.id === threadId);

    if (threadIndex === -1) return of(false);

    const updatedThreads = [...currentThreads];
    updatedThreads[threadIndex] = {
      ...updatedThreads[threadIndex],
      unreadCount: 0,
      lastMessage: {
        ...updatedThreads[threadIndex].lastMessage,
        read: true
      }
    };

    this.threads.next(updatedThreads);
    return of(true).pipe(delay(300));
  }

  searchThreads(query: string): Observable<ChatThread[]> {
    const normalizedQuery = query.toLowerCase().trim();
    return this.threads.pipe(
      map(threads => threads.filter(thread =>
        thread.worker.name.toLowerCase().includes(normalizedQuery) ||
        thread.worker.service.toLowerCase().includes(normalizedQuery) ||
        thread.lastMessage.content.toLowerCase().includes(normalizedQuery) ||
        (thread.serviceRequest?.service.toLowerCase().includes(normalizedQuery))
      ))
    );
  }

  getUnreadCount(): Observable<number> {
    return this.threads.pipe(
      map(threads => threads.reduce((sum, thread) => sum + thread.unreadCount, 0))
    );
  }

  archiveThread(threadId: number): Observable<boolean> {
    const currentThreads = this.threads.value;
    const threadIndex = currentThreads.findIndex(t => t.id === threadId);

    if (threadIndex === -1) return of(false);

    const updatedThreads = [...currentThreads];
    updatedThreads[threadIndex] = {
      ...updatedThreads[threadIndex],
      status: 'archived'
    };

    this.threads.next(updatedThreads);
    return of(true).pipe(delay(300));
  }

  blockThread(threadId: number): Observable<boolean> {
    const currentThreads = this.threads.value;
    const threadIndex = currentThreads.findIndex(t => t.id === threadId);

    if (threadIndex === -1) return of(false);

    const updatedThreads = [...currentThreads];
    updatedThreads[threadIndex] = {
      ...updatedThreads[threadIndex],
      status: 'blocked'
    };

    this.threads.next(updatedThreads);
    return of(true).pipe(delay(300));
  }

  deleteThread(threadId: number): Observable<boolean> {
    const currentThreads = this.threads.value;
    const updatedThreads = currentThreads.filter(t => t.id !== threadId);
    this.threads.next(updatedThreads);
    return of(true).pipe(delay(300));
  }

  markAllAsRead(): Observable<boolean> {
    const currentThreads = this.threads.value;
    const updatedThreads = currentThreads.map(thread => ({
      ...thread,
      unreadCount: 0,
      lastMessage: {
        ...thread.lastMessage,
        read: true
      }
    }));

    this.threads.next(updatedThreads);
    return of(true).pipe(delay(300));
  }

  sendAttachment(threadId: number, type: 'image' | 'location', content: string): Observable<Message> {
    const newMessage: Message = {
      id: Date.now(),
      senderId: 1,
      receiverId: threadId,
      content,
      timestamp: new Date(),
      read: false,
      type
    };

    const currentThreads = this.threads.value;
    const threadIndex = currentThreads.findIndex(t => t.id === threadId);

    if (threadIndex !== -1) {
      const updatedThreads = [...currentThreads];
      updatedThreads[threadIndex] = {
        ...updatedThreads[threadIndex],
        lastMessage: newMessage,
        lastActivity: new Date()
      };
      this.threads.next(updatedThreads);

      // Simulate worker viewing attachment
      setTimeout(() => {
        this.simulateWorkerResponse(threadId, updatedThreads[threadIndex]);
      }, Math.random() * 3000 + 2000);
    }

    return of(newMessage).pipe(delay(300));
  }

  // Helper method to persist threads state
  private persistThreads(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.threads.value));
    } catch (error) {
      console.error('Error persisting threads:', error);
    }
  }

  // Helper method to restore threads state
  private restoreThreads(): ChatThread[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const threads = JSON.parse(stored);
        // Convert string dates back to Date objects
        return threads.map((thread: any) => ({
          ...thread,
          lastActivity: new Date(thread.lastActivity),
          lastMessage: {
            ...thread.lastMessage,
            timestamp: new Date(thread.lastMessage.timestamp)
          }
        }));
      }
    } catch (error) {
      console.error('Error restoring threads:', error);
    }
    return [];
  }

  // Clean up method
  destroy(): void {
    this.threads.complete();
    this.typingStatus.complete();
  }
}
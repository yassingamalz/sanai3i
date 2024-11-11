import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserType = 'worker' | 'customer' | null;

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  rating?: number;
  completedJobs?: number;
  balance?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private userTypeSubject = new BehaviorSubject<UserType>(null);
  public userType$ = this.userTypeSubject.asObservable();

  constructor() {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.userTypeSubject.next(user.type);
    }
  }

  setUserType(type: UserType): void {
    this.userTypeSubject.next(type);
  }

  login(type: UserType): void {
    // Simulate login with mock user data
    const mockUser: User = {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '01234567890',
      type: type,
      rating: type === 'worker' ? 4.8 : undefined,
      completedJobs: type === 'worker' ? 150 : undefined,
      balance: type === 'worker' ? 2500 : undefined
    };
    
    this.currentUserSubject.next(mockUser);
    this.userTypeSubject.next(type);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.userTypeSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
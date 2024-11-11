import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserType } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-type',
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div class="text-4xl font-bold text-red-500 mb-8">صنايعي</div>
      <div class="text-xl text-gray-600 mb-12">اختر نوع الحساب</div>
      <div class="w-full max-w-md space-y-4">
        <button
          (click)="selectType('customer')"
          class="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between hover:border-red-500"
        >
          <div class="flex items-center">
            <i class="fas fa-user text-red-500 text-2xl ml-4"></i>
            <div class="text-right">
              <div class="font-bold text-lg">عميل</div>
              <div class="text-sm text-gray-600">ابحث عن خدمات وصنايعية</div>
            </div>
          </div>
          <i class="fas fa-chevron-right text-gray-400"></i>
        </button>
        
        <button
          (click)="selectType('worker')"
          class="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between hover:border-red-500"
        >
          <div class="flex items-center">
            <i class="fas fa-tools text-red-500 text-2xl ml-4"></i>
            <div class="text-right">
              <div class="font-bold text-lg">صنايعي</div>
              <div class="text-sm text-gray-600">قدم خدماتك واستقبل طلبات</div>
            </div>
          </div>
          <i class="fas fa-chevron-right text-gray-400"></i>
        </button>
      </div>
    </div>
  `
})
export class UserTypeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  selectType(type: UserType): void {
    this.authService.login(type);
    this.router.navigate(['/']);
  }
}
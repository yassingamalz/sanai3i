import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <div class="text-5xl font-bold text-red-500 mb-6">صنايعي</div>
      <div class="text-xl text-gray-600 mb-16">كل الصنايعية في مكان واحد</div>
      <div class="w-full max-w-md space-y-4">
        <button
          (click)="navigate('login')"
          class="w-full bg-red-500 text-white px-8 py-4 rounded-xl text-lg font-bold"
        >
          تسجيل الدخول
        </button>
        <button
          (click)="navigate('register')"
          class="w-full border-2 border-red-500 text-red-500 px-8 py-4 rounded-xl text-lg font-bold"
        >
          حساب جديد
        </button>
      </div>
    </div>
  `
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  navigate(route: string): void {
    this.router.navigate(['/auth/user-type']);
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-method',
  templateUrl: './register-method.component.html',
  styleUrls: ['./register-method.component.scss']
})
export class RegisterMethodComponent {
registrationMethods = [
  {
    id: 'google',
    icon: 'assets/icons/google.svg', // Make sure you have this icon
    isImage: true,
    label: 'التسجيل باستخدام Google',
    iconClass: 'w-5 h-5'
  },
  {
    id: 'apple',
    icon: 'fab fa-apple',
    isImage: false,
    label: 'التسجيل باستخدام Apple',
    iconClass: 'text-xl'
  },
  {
    id: 'email',
    icon: 'far fa-envelope',
    isImage: false,
    label: 'التسجيل باستخدام البريد الإلكتروني',
    iconClass: 'text-lg'
  },
  {
    id: 'phone',
    icon: 'fas fa-phone',
    isImage: false,
    label: 'التسجيل برقم الهاتف',
    iconClass: 'text-lg'
  }
];

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/auth/user-type']);
  }

  registerWith(method: string): void {
    switch(method) {
      case 'email':
        this.router.navigate(['/auth/register/email']);
        break;
      case 'phone':
        this.router.navigate(['/auth/register/phone']);
        break;
      case 'google':
        // Implement Google sign-in
        console.log('Google sign-in');
        break;
      case 'apple':
        // Implement Apple sign-in
        console.log('Apple sign-in');
        break;
    }
  }
}
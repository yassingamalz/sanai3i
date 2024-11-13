import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface RegistrationMethod {
  id: string;
  icon: string;
  isImage: boolean;
  label: string;
  iconClass?: string;
}

@Component({
  selector: 'app-register-method',
  templateUrl: './register-method.component.html',
  styleUrls: ['./register-method.component.scss']
})
export class RegisterMethodComponent {
  registrationMethods: RegistrationMethod[] = [
    {
      id: 'google',
      icon: 'fab fa-google',
      isImage: false,
      label: 'التسجيل باستخدام Google',
      iconClass: 'text-lg'
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
      icon: 'fas fa-phone-alt',
      isImage: false,
      label: 'التسجيل برقم الهاتف',
      iconClass: 'text-lg'
    }
  ];

  constructor(private router: Router) {}

  registerWith(method: string): void {
    switch(method) {
      case 'email':
        this.router.navigate(['/auth/register/email']);
        break;
      case 'phone':
        this.router.navigate(['/auth/register/phone']);
        break;
      case 'google':
        console.log('Google sign-in');
        break;
      case 'apple':
        console.log('Apple sign-in');
        break;
    }
  }
}
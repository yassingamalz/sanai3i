// email-register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-register',
  templateUrl: './email-register.component.html',
  styleUrls: ['./email-register.component.scss']
})
export class EmailRegisterComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  currentStep = 1;
  showPassword = false;
  showConfirmPassword = false;
  redirectCountdown = 3;
  private countdownInterval: any;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      emailVerificationCode: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ]],
      phoneVerificationCode: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      userType: ['', Validators.required],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.updateFormValidation();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  updateFormValidation() {
    // Disable all controls initially
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.disable();
    });

    // Enable only the controls needed for current step
    switch (this.currentStep) {
      case 1: // Email Input
        this.form.get('email')?.enable();
        break;
      case 2: // Email Verification
        this.form.get('emailVerificationCode')?.enable();
        break;
      case 3: // Phone Input
        this.form.get('phone')?.enable();
        break;
      case 4: // Phone Verification
        this.form.get('phoneVerificationCode')?.enable();
        break;
      case 5: // Password Setup
        this.form.get('password')?.enable();
        this.form.get('confirmPassword')?.enable();
        break;
      case 6: // User Type Selection
        this.form.get('userType')?.enable();
        break;
      case 7: // User Details
        this.form.get('fullName')?.enable();
        this.form.get('address')?.enable();
        this.form.get('acceptTerms')?.enable();
        break;
    }
  }

  onSubmit(): void {
    if (this.form.valid && !this.submitting) {
      this.submitting = true;

      switch (this.currentStep) {
        case 1:
          this.mockSendEmailVerification();
          break;
        case 2:
          this.mockVerifyEmail();
          break;
        case 3:
          this.mockSendPhoneVerification();
          break;
        case 4:
          this.mockVerifyPhone();
          break;
        case 5:
          this.mockSetupPassword();
          break;
        case 6:
          this.mockSetUserType();
          break;
        case 7:
          this.mockCompleteRegistration();
          break;
      }
    }
  }

  private mockSendEmailVerification() {
    setTimeout(() => {
      this.submitting = false;
      this.currentStep = 2;
      this.updateFormValidation();
    }, 1000);
  }

  private mockVerifyEmail() {
    setTimeout(() => {
      this.submitting = false;
      this.currentStep = 3;
      this.updateFormValidation();
    }, 1000);
  }

  private mockSendPhoneVerification() {
    setTimeout(() => {
      this.submitting = false;
      this.currentStep = 4;
      this.updateFormValidation();
    }, 1000);
  }

  private mockVerifyPhone() {
    setTimeout(() => {
      this.submitting = false;
      this.currentStep = 5;
      this.updateFormValidation();
    }, 1000);
  }

  selectUserType(type: 'customer' | 'worker'): void {
    this.form.patchValue({ userType: type });
    // Auto proceed to next step after selection
    setTimeout(() => {
      this.onSubmit();
    }, 300);
  }

  private mockSetupPassword() {
    setTimeout(() => {
      this.submitting = false;
      this.currentStep = 6;
      this.updateFormValidation();
    }, 1000);
  }

  private mockSetUserType() {
    setTimeout(() => {
      this.submitting = false;
      this.currentStep = 7;
      this.updateFormValidation();
    }, 1000);
  }

  private mockCompleteRegistration() {
    setTimeout(() => {
      this.submitting = false;
      this.currentStep = 8; // Success state
      this.startRedirectCountdown();
    }, 1000);
  }

  startRedirectCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.redirectCountdown > 0) {
        this.redirectCountdown--;
      } else {
        clearInterval(this.countdownInterval);
        this.router.navigate(['/auth/login']);
      }
    }, 1000);
  }

  onOtpCompleted(otp: string, type: 'email' | 'phone') {
    const controlName = type === 'email' ? 'emailVerificationCode' : 'phoneVerificationCode';
    if (otp.length === 6 && this.form.get(controlName)?.valid) {
      setTimeout(() => {
        this.form.patchValue({ [controlName]: otp });
        this.onSubmit();
      }, 200);
    }
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'التسجيل بالبريد الإلكتروني';
      case 2: return 'تأكيد البريد الإلكتروني';
      case 3: return 'إضافة رقم الهاتف';
      case 4: return 'تأكيد رقم الهاتف';
      case 5: return 'إنشاء كلمة المرور';
      case 6: return 'نوع الحساب';
      case 7: return 'معلومات المستخدم';
      case 8: return 'اكتمل التسجيل';
      default: return '';
    }
  }

  getStepSubtitle(): string {
    switch (this.currentStep) {
      case 1: return 'أدخل بريدك الإلكتروني للتسجيل';
      case 2: return 'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني';
      case 3: return 'أدخل رقم هاتفك للمتابعة';
      case 4: return 'أدخل رمز التحقق المرسل إلى رقم هاتفك';
      case 5: return 'قم بإنشاء كلمة مرور قوية لحسابك';
      case 6: return 'اختر نوع حسابك';
      case 7: return 'أكمل معلومات حسابك';
      case 8: return `سيتم تحويلك إلى صفحة تسجيل الدخول خلال ${this.redirectCountdown} ثواني`;
      default: return '';
    }
  }
}
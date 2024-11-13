// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  currentStep = 1;
  resendDisabled = false;
  resendTimer = 0;
  private timerInterval: any;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      emailOrPhone: ['', [
        Validators.required,
        Validators.pattern(/^([0-9]{11}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
      ]],
      verificationCode: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/)
      ]]
    });
  }

  ngOnInit() {
    this.updateFormValidation();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  updateFormValidation() {
    const emailOrPhoneControl = this.form.get('emailOrPhone');
    const codeControl = this.form.get('verificationCode');

    switch (this.currentStep) {
      case 1:
        emailOrPhoneControl?.enable();
        codeControl?.disable();
        break;
      case 2:
        emailOrPhoneControl?.disable();
        codeControl?.enable();
        this.startResendTimer();
        break;
    }
  }

  onSubmit(): void {
    if (this.form.valid && !this.submitting) {
      this.submitting = true;

      switch (this.currentStep) {
        case 1:
          if (this.validateEmailOrPhone()) {
            this.mockSendVerificationCode();
          } else {
            this.submitting = false;
          }
          break;
        case 2:
          this.mockVerifyCode();
          break;
      }
    }
  }

  private validateEmailOrPhone(): boolean {
    const value = this.form.get('emailOrPhone')?.value;
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    const isPhone = /^01[0125][0-9]{8}$/.test(value);
    
    if (!isEmail && !isPhone) {
      this.form.get('emailOrPhone')?.setErrors({ 
        invalidFormat: true 
      });
      return false;
    }
    return true;
  }

  private mockSendVerificationCode() {
    setTimeout(() => {
      this.submitting = false;
      this.currentStep = 2;
      this.updateFormValidation();
    }, 1000);
  }

  private mockVerifyCode() {
    setTimeout(() => {
      this.submitting = false;
      this.router.navigate(['/auth/user-type']);
    }, 1000);
  }

  onOtpCompleted(otp: string) {
    if (otp.length === 6 && !this.submitting) {
      this.form.patchValue({ verificationCode: otp });
      setTimeout(() => this.onSubmit(), 200);
    }
  }

  startResendTimer() {
    this.resendDisabled = true;
    this.resendTimer = 30;
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      if (this.resendTimer > 0) {
        this.resendTimer--;
      } else {
        this.resendDisabled = false;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  onResendCode() {
    if (!this.resendDisabled) {
      this.startResendTimer();
      // Mock sending new code
      console.log('Resending verification code...');
    }
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'تسجيل الدخول';
      case 2: return 'تأكيد رمز التحقق';
      default: return '';
    }
  }

  getStepSubtitle(): string {
    switch (this.currentStep) {
      case 1: return 'أدخل بريدك الإلكتروني أو رقم هاتفك للمتابعة';
      case 2: return 'أدخل رمز التحقق المرسل إليك';
      default: return '';
    }
  }

  getErrorMessage(): string {
    const control = this.form.get('emailOrPhone');
    if (control?.errors?.['required'] && control.touched) {
      return 'هذا الحقل مطلوب';
    }
    if (control?.errors?.['invalidFormat']) {
      return 'يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح';
    }
    return '';
  }
}
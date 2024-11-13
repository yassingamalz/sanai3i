import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-register',
  templateUrl: './phone-register.component.html',
  styleUrls: ['./phone-register.component.scss']
})
export class PhoneRegisterComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  currentStep = 1;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      phone: ['', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ]],
      verificationCode: ['', [
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
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.updateFormValidation();
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
    const phoneControl = this.form.get('phone');
    const codeControl = this.form.get('verificationCode');
    const passwordControl = this.form.get('password');
    const confirmPasswordControl = this.form.get('confirmPassword');
    const termsControl = this.form.get('acceptTerms');

    switch (this.currentStep) {
      case 1:
        phoneControl?.enable();
        codeControl?.disable();
        passwordControl?.disable();
        confirmPasswordControl?.disable();
        termsControl?.disable();
        break;
      case 2:
        phoneControl?.disable();
        codeControl?.enable();
        passwordControl?.disable();
        confirmPasswordControl?.disable();
        termsControl?.disable();
        break;
      case 3:
        phoneControl?.disable();
        codeControl?.disable();
        passwordControl?.enable();
        confirmPasswordControl?.enable();
        termsControl?.enable();
        break;
    }
  }

  onSubmit(): void {
    if (this.form.valid && !this.submitting) {
      this.submitting = true;

      switch (this.currentStep) {
        case 1:
          this.mockSendVerificationCode();
          break;
        case 2:
          this.mockVerifyCode();
          break;
        case 3:
          this.mockCompleteRegistration();
          break;
      }
    }
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
      this.currentStep = 3;
      this.updateFormValidation();
    }, 1000);
  }

  private mockCompleteRegistration() {
    setTimeout(() => {
      this.submitting = false;
      this.router.navigate(['/auth/welcome']);
    }, 1000);
  }

  onOtpCompleted(otp: string) {
    // Validate the OTP length before proceeding
    if (otp.length === 6 && this.form.get('verificationCode')?.valid) {
      // Add a debounce to prevent rapid submissions
      setTimeout(() => {
        this.form.patchValue({ verificationCode: otp });
        this.onSubmit();
      }, 200);
    }
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'التسجيل برقم الهاتف';
      case 2: return 'تأكيد رقم الهاتف';
      case 3: return 'إنشاء كلمة المرور';
      default: return '';
    }
  }

  getStepSubtitle(): string {
    switch (this.currentStep) {
      case 1: return 'أدخل رقم هاتفك للتسجيل';
      case 2: return 'أدخل رمز التحقق المرسل إلى رقم هاتفك';
      case 3: return 'قم بإنشاء كلمة مرور قوية لحسابك';
      default: return '';
    }
  }
}
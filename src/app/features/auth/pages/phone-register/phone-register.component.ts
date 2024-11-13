// phone-register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-register',
  templateUrl: './phone-register.component.html',
  styleUrls: ['./phone-register.component.scss']
})
export class PhoneRegisterComponent {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.form.valid && !this.submitting) {
      this.submitting = true;
      // Implement your registration logic here
      setTimeout(() => {
        this.router.navigate(['/auth/verify']);
      }, 1000);
    }
  }
}
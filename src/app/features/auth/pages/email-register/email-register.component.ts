// email-register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-register',
  templateUrl: './email-register.component.html',
  styleUrls: ['./email-register.component.scss']
})
export class EmailRegisterComponent {
  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
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
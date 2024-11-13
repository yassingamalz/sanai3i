import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceType } from './complete-profile.types';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isWorker = false; // Set based on user selection
  submitting = false;
  
  serviceTypes: ServiceType[] = [
    { id: 'electrician', name: 'كهربائي' },
    { id: 'plumber', name: 'سباك' },
    { id: 'carpenter', name: 'نجار' },
    { id: 'painter', name: 'نقاش' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const baseForm = {
      fullName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]]
    };

    if (this.isWorker) {
      Object.assign(baseForm, {
        serviceType: ['', Validators.required],
        experience: ['', [
          Validators.required,
          Validators.min(0),
          Validators.max(50)
        ]]
      });
    }

    this.profileForm = this.fb.group(baseForm);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.submitting = true;
      // TODO: Implement form submission
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1500); // Simulated delay
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  goBack(): void {
    this.router.navigate(['/auth/verify']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.profileForm.get(controlName);
    return control?.touched && control?.hasError(errorType) || false;
  }
}
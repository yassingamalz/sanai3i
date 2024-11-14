import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestDataService } from '../../../../core/services/request.service';
import { RequestStep, ServiceRequest } from '../../../../shared/interfaces/request.interface';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form!: FormGroup;
  currentStep = 1;
  loading = false;
  steps: RequestStep[] = [];
  categories = this.requestService.categories;
  selectedImages: File[] = [];
  estimatedCost = 0;
  today = new Date().toISOString().split('T')[0];
  
  get selectedCategory() {
    const categoryId = this.form.get('category')?.value;
    return this.categories.find(c => c.id === categoryId);
  }

  get cardDetailsGroup() {
    return this.form.get('cardDetails') as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private requestService: RequestDataService
  ) {
    this.initForm();
    this.steps = this.requestService.steps;
  }

  ngOnInit() {
    this.watchFormChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    this.form = this.fb.group({
      category: ['', Validators.required],
      service: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      images: [[]],
      location: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      scheduledTime: ['', Validators.required],
      paymentMethod: ['cash', Validators.required],
      cardDetails: this.fb.group({
        cardNumber: [''],
        expiryDate: [''],
        cvv: [''],
        nameOnCard: ['']
      })
    });
  }

  private setCardValidators() {
    const cardControls = {
      cardNumber: [Validators.required, Validators.pattern(/^\d{16}$/)],
      expiryDate: [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      cvv: [Validators.required, Validators.pattern(/^\d{3}$/)],
      nameOnCard: [Validators.required]
    };

    Object.keys(cardControls).forEach(key => {
      const control = this.cardDetailsGroup.get(key);
      if (control) {
        control.setValidators(cardControls[key as keyof typeof cardControls]);
        control.updateValueAndValidity();
      }
    });
  }

  private clearCardValidators() {
    Object.keys(this.cardDetailsGroup.controls).forEach(key => {
      const control = this.cardDetailsGroup.get(key);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }

  private watchFormChanges() {
    this.form.get('category')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(category => {
      this.form.patchValue({ service: '' });
      if (category && this.form.get('service')?.value) {
        this.updateEstimatedCost();
      }
    });

    this.form.get('service')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(service => {
      if (service && this.form.get('category')?.value) {
        this.updateEstimatedCost();
      }
    });
  }

  private updateEstimatedCost() {
    const category = this.form.get('category')?.value;
    const service = this.form.get('service')?.value;
    if (category && service) {
      this.estimatedCost = this.requestService.calculateEstimatedCost(category, service);
    }
  }

  isStepValid(): boolean {
    return this.requestService.validateStep(this.currentStep, this.form.value);
  }

  nextStep() {
    if (this.currentStep < this.steps.length && this.isStepValid()) {
      this.steps[this.currentStep - 1].completed = true;
      this.currentStep++;
      this.requestService.updateCurrentRequest(this.form.value);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.selectedImages = [...this.selectedImages, ...files].slice(0, 5); // Maximum 5 images
      this.form.patchValue({ images: this.selectedImages });
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.form.patchValue({ images: this.selectedImages });
  }

  onSubmit() {
    if (this.form.valid && !this.loading) {
      this.loading = true;
      const request: ServiceRequest = {
        ...this.form.value,
        status: 'pending',
        createdAt: new Date().toISOString(),
        customerId: 1 // Should come from auth service
      };

      this.requestService.createRequest(request)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.router.navigate(['/requests']);
          },
          error: (error) => {
            console.error('Error submitting request:', error);
            this.loading = false;
          }
        });
    }
  }
}
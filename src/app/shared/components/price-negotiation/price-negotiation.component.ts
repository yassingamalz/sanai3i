// price-negotiation.component.ts
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { 
  NegotiationHistory, 
  NegotiationOffer, 
  PriceNegotiationData, 
  PriceNegotiationResult 
} from '../../interfaces/request.interface';
import { RequestDataService } from '../../../core/services/request.service';

@Component({
  selector: 'app-price-negotiation',
  templateUrl: './price-negotiation.component.html',
  styleUrls: ['./price-negotiation.component.scss']
})
export class PriceNegotiationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  offerForm!: FormGroup;
  offers: NegotiationOffer[] = [];
  submitting = false;
  minPrice: number;
  maxPrice: number;

  constructor(
    private dialogRef: MatDialogRef<PriceNegotiationComponent, PriceNegotiationResult>,
    @Inject(MAT_DIALOG_DATA) public data: PriceNegotiationData,
    private fb: FormBuilder,
    private requestService: RequestDataService
  ) {
    const priceRange = this.requestService.calculatePriceRange(data.originalPrice);
    this.minPrice = priceRange.min;
    this.maxPrice = priceRange.max;
    this.initializeForm();
  }

  ngOnInit() {
    this.loadNegotiationHistory();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.offerForm = this.fb.group({
      price: [this.data.originalPrice, [
        Validators.required,
        Validators.min(this.minPrice),
        Validators.max(this.maxPrice)
      ]],
      message: ['']
    });
  }

  private loadNegotiationHistory(): void {
    this.requestService.getNegotiationHistory(this.data.requestId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(history => {
        this.offers = history.map(item => ({
          id: item.id,
          price: item.price,
          message: item.message || '',
          type: item.type,
          timestamp: new Date(item.timestamp),
          percentageChange: item.percentageChange
        }));
      });
  }

  getAlignmentClass(type: 'provider' | 'customer'): string {
    return type === 'customer' ? 'text-right' : 'text-left';
  }

  getBackgroundClass(type: 'provider' | 'customer'): string {
    return type === 'customer' ? 'bg-red-50 rounded-lg p-3' : 'bg-gray-50 rounded-lg p-3';
  }

  getPriceChangeClass(change: number): string {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  }

  getPercentageDisplay(change: number): string {
    return `(${change > 0 ? '+' : ''}${change}%)`;
  }

  shouldShowPriceError(): boolean {
    const priceControl = this.offerForm.get('price');
    return priceControl ? priceControl.touched && priceControl.errors !== null : false;
  }

  getPriceErrorMessage(): string {
    const priceControl = this.offerForm.get('price');
    if (!priceControl || !priceControl.errors) return '';

    if (priceControl.errors['required']) return 'الرجاء إدخال السعر';
    if (priceControl.errors['min'] || priceControl.errors['max']) {
      return `السعر يجب أن يكون بين ${this.minPrice} و ${this.maxPrice} جنيه`;
    }
    return '';
  }

  canSubmit(): boolean {
    return this.offerForm.valid && !this.submitting;
  }

  submitOffer(): void {
    if (!this.canSubmit()) return;

    this.submitting = true;
    const formValue = this.offerForm.value;

    this.requestService.updateRequestPrice(this.data.requestId, {
      price: formValue.price,
      message: formValue.message
    }).pipe(
      finalize(() => this.submitting = false),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.dialogRef.close({
          price: formValue.price,
          accepted: true
        });
      },
      error: (error) => {
        console.error('Error updating price:', error);
      }
    });
  }

  close(): void {
    this.dialogRef.close({ accepted: false });
  }
}
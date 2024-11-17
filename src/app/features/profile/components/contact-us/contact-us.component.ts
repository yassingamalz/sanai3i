import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  template: `
    <div class="section-content">
      <div class="contact-container">
        <!-- Contact Methods -->
        <div class="contact-methods">
          <div *ngFor="let method of contactMethods" class="contact-method">
            <i class="fas fa-{{method.icon}}"></i>
            <div class="method-details">
              <h3>{{method.title}}</h3>
              <p>{{method.value}}</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
          <div class="form-group">
            <label>الموضوع</label>
            <select formControlName="subject">
              <option value="">اختر الموضوع</option>
              <option *ngFor="let subject of subjects" [value]="subject.value">
                {{subject.label}}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>الرسالة</label>
            <textarea 
              formControlName="message" 
              rows="4"
              placeholder="اكتب رسالتك هنا..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="submit-button"
            [disabled]="contactForm.invalid"
          >
            <i class="fas fa-paper-plane"></i>
            إرسال
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      padding: 1rem;
    }

    .contact-methods {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: #f9fafb;
      border-radius: 0.5rem;

      i {
        color: #ef4444;
        font-size: 1.5rem;
      }

      .method-details {
        h3 {
          font-size: 1rem;
          font-weight: 500;
          color: #1f2937;
          margin: 0;
        }

        p {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0.25rem 0 0;
        }
      }
    }

    .contact-form {
      .form-group {
        margin-bottom: 1rem;

        label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        select, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          background-color: white;
          color: #1f2937;
          font-size: 0.875rem;

          &:focus {
            outline: none;
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
          }
        }

        textarea {
          resize: vertical;
        }
      }
    }

    .submit-button {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #ef4444;
      color: white;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background-color: #dc2626;
      }

      i {
        font-size: 1rem;
      }
    }
  `]
})
export class ContactUsComponent {
  contactForm: FormGroup;

  contactMethods = [
    {
      icon: 'phone',
      title: 'اتصل بنا',
      value: '19XXX'
    },
    {
      icon: 'envelope',
      title: 'البريد الإلكتروني',
      value: 'support@sanai3i.com'
    },
    {
      icon: 'clock',
      title: 'ساعات العمل',
      value: 'من 9 صباحاً حتى 9 مساءً'
    }
  ];

  subjects = [
    { value: 'technical', label: 'مشكلة تقنية' },
    { value: 'billing', label: 'استفسار عن الدفع' },
    { value: 'complaint', label: 'شكوى' },
    { value: 'suggestion', label: 'اقتراح' },
    { value: 'other', label: 'أخرى' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Handle form submission
    }
  }
}


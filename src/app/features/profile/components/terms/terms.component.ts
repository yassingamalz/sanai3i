import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  template: `
    <div class="section-content">
      <div class="terms-container">
        <!-- Last Updated -->
        <div class="last-updated">
          آخر تحديث: {{lastUpdated | date:'mediumDate'}}
        </div>

        <!-- Terms Sections -->
        <div class="terms-sections">
          <div *ngFor="let section of termsSections" class="terms-section">
            <h3>{{section.title}}</h3>
            <p>{{section.content}}</p>
          </div>
        </div>

        <!-- Acceptance Button -->
        <div class="terms-acceptance">
          <label class="checkbox-container">
            <input 
              type="checkbox" 
              [checked]="accepted"
              (change)="toggleAcceptance()"
            >
            <span class="checkmark"></span>
            <span class="acceptance-text">أوافق على الشروط والأحكام</span>
          </label>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .terms-container {
      padding: 1rem;
    }

    .last-updated {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }

    .terms-sections {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .terms-section {
      h3 {
        color: #1f2937;
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }

      p {
        color: #4b5563;
        line-height: 1.6;
      }
    }

    .terms-acceptance {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;

      input {
        display: none;
      }

      .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid #ef4444;
        border-radius: 4px;
        position: relative;

        &:after {
          content: "";
          position: absolute;
          display: none;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }

      input:checked + .checkmark {
        background-color: #ef4444;
        
        &:after {
          display: block;
        }
      }

      .acceptance-text {
        color: #1f2937;
        font-size: 0.875rem;
      }
    }
  `]
})
export class TermsComponent {
  lastUpdated = new Date('2024-03-01');
  accepted = false;

  termsSections = [
    {
      title: 'مقدمة',
      content: 'مرحباً بك في تطبيق صنايعي. هذه الشروط والأحكام تحكم استخدامك للتطبيق وجميع الخدمات المقدمة من خلاله.'
    },
    {
      title: 'الخدمات',
      content: 'نقدم منصة تربط بين الصنايعية والعملاء. نحن لسنا مسؤولين عن جودة الخدمات المقدمة من قبل الصنايعية.'
    },
    {
      title: 'المدفوعات',
      content: 'جميع المدفوعات تتم من خلال التطبيق. نحتفظ بحق تعليق الحسابات التي تحاول التحايل على نظام الدفع.'
    }
  ];

  toggleAcceptance() {
    this.accepted = !this.accepted;
  }
}
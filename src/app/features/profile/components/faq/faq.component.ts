import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  template: `
    <div class="section-content">
      <div class="faq-container">
        <div *ngFor="let item of faqItems" class="faq-item">
          <div class="faq-question" 
               (click)="toggleItem(item)"
               [class.expanded]="item.expanded">
            <span>{{item.question}}</span>
            <i class="fas" 
               [class.fa-chevron-down]="!item.expanded"
               [class.fa-chevron-up]="item.expanded"></i>
          </div>
          <div class="faq-answer" 
               *ngIf="item.expanded"
               [@expandCollapse]>
            {{item.answer}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .faq-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .faq-question {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      background-color: white;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f9fafb;
      }

      &.expanded {
        background-color: #fee2e2;
        color: #ef4444;
      }

      i {
        transition: transform 0.2s ease;
      }
    }

    .faq-answer {
      padding: 1rem;
      background-color: #f9fafb;
      border-top: 1px solid #e5e7eb;
      line-height: 1.5;
      color: #4b5563;
    }
  `]
})

export class FaqComponent {
  faqItems = [
    {
      question: 'كيف يمكنني التسجيل كصنايعي؟',
      answer: 'يمكنك التسجيل كصنايعي من خلال الضغط على زر "التسجيل" واختيار "صنايعي" كنوع الحساب.',
      expanded: false
    },
    {
      question: 'كيف يمكنني تغيير كلمة المرور؟',
      answer: 'يمكنك تغيير كلمة المرور من خلال الإعدادات > الأمان > تغيير كلمة المرور.',
      expanded: false
    },
    {
      question: 'كيف يتم الدفع؟',
      answer: 'نحن نقبل الدفع عن طريق البطاقات الائتمانية والدفع عند الاستلام.',
      expanded: false
    }
  ];

  toggleItem(item: any) {
    item.expanded = !item.expanded;
  }
}
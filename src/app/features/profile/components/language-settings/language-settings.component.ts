import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-language-settings',
  template: `
    <div class="section-content">
      <div class="language-settings">
        <div *ngFor="let language of languages" 
             class="language-option"
             [class.selected]="language.code === selectedLanguage"
             (click)="selectLanguage(language.code)">
          <div class="language-info">
            <img [src]="language.flag" [alt]="language.name">
            <span>{{language.name}}</span>
          </div>
          <i *ngIf="language.code === selectedLanguage" 
             class="fas fa-check"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .language-settings {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .language-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f3f4f6;
      }

      &.selected {
        background-color: #fee2e2;
        
        i {
          color: #ef4444;
        }
      }
    }

    .language-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }
  `]
})
export class LanguageSettingsComponent {
  @Input() selectedLanguage = 'ar';
  @Output() languageChange = new EventEmitter<string>();
    
  languages = [
    { code: 'ar', name: 'العربية', flag: '/api/placeholder/24/24' },
    { code: 'en', name: 'English', flag: '/api/placeholder/24/24' }
  ];

  selectLanguage(code: string) {
    this.selectedLanguage = code;
    this.languageChange.emit(code);  }
}


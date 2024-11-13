// back-button.component.ts
import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  template: `
    <button (click)="onBack()" class="flex items-center text-[#ef4444] py-2">
      <i class="fas fa-chevron-left ml-2"></i>
      {{ text }}
    </button>
  `,
  styles: [`
    :host {
      display: block;
      padding: 1rem;
    }
  `]
})
export class BackButtonComponent {
  @Input() text: string = 'رجوع';

  constructor(private location: Location) {}

  onBack(): void {
    this.location.back();
  }
}
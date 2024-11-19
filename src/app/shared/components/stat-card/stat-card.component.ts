import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  @Input() icon!: string;
  @Input() iconColor!: string;
  @Input() value!: number;
  @Input() label!: string;
  @Input() showCurrency = false;

  get iconClasses(): string {
    return `${this.icon} ${this.iconColor}`;
  }
}
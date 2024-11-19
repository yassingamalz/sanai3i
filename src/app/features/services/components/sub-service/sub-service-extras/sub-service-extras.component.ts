// sub-service-extras.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
  description?: string;
  icon?: string;
  selected?: boolean;
}

@Component({
  selector: 'app-sub-service-extras',
  templateUrl: './sub-service-extras.component.html',
  styleUrls: ['./sub-service-extras.component.scss']
})
export class SubServiceExtrasComponent {
  @Input() extras: ExtraOption[] = [];
  @Output() extraToggled = new EventEmitter<ExtraOption>();

  onExtraToggle(extra: ExtraOption, event: Event): void {
    event.preventDefault();
    extra.selected = !extra.selected;
    this.extraToggled.emit(extra);
  }
}
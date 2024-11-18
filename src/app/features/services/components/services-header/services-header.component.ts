// services-header.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-services-header',
  templateUrl: './services-header.component.html',
  styleUrls: ['./services-header.component.scss']
})
export class ServicesHeaderComponent {
  @Input() title: string = 'كل الخدمات';
}
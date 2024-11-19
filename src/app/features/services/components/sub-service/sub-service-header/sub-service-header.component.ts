// sub-service-header.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-service-header',
  templateUrl: './sub-service-header.component.html',
  styleUrls: ['./sub-service-header.component.scss']
})
export class SubServiceHeaderComponent {
  @Input() serviceName: string = '';
  @Input() redirectUrl: string = '';
}
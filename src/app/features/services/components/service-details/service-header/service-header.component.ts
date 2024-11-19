// service-header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-service-header',
  templateUrl: './service-header.component.html',
  styleUrls: ['./service-header.component.scss']
})
export class ServiceHeaderComponent {
  redirectUrl = 'services/all-services';
}
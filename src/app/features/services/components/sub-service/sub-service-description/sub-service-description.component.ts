// sub-service-description.component.ts
import { Component, Input } from '@angular/core';

interface ServiceFeature {
  icon: string;
  label: string;
  value: string;
  color: string;
}

@Component({
  selector: 'app-sub-service-description',
  templateUrl: './sub-service-description.component.html',
  styleUrls: ['./sub-service-description.component.scss']
})
export class SubServiceDescriptionComponent {
  @Input() description: string = '';
  @Input() estimatedTime: string = '';
  @Input() price: number = 0;

  features: ServiceFeature[] = [
    { 
      icon: 'fas fa-shield-alt', 
      label: 'ضمان لمدة عام', 
      value: 'متوفر',
      color: 'rose'
    },
    { 
      icon: 'fas fa-medal', 
      label: 'خدمة معتمدة', 
      value: 'موثقة',
      color: 'blue'
    },
    { 
      icon: 'fas fa-headset', 
      label: 'دعم فني', 
      value: '24/7',
      color: 'emerald'
    }
  ];
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

interface Address {
  id: number;
  title: string;
  details: string;
  isDefault: boolean;
}

interface Section {
  id: string;
  title: string;
  icon: string;
  forWorker?: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('200ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('200ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {
  expandedSections: { [key: string]: boolean } = {
    personal: true,
    addresses: false,
    notifications: false,
    wallet: false,
    language: false,
    terms: false,
    contact: false
  };

  readonly sections: Section[] = [
    { id: 'personal', title: 'المعلومات الشخصية', icon: 'user' },
    { id: 'addresses', title: 'العناوين', icon: 'map-pin' },
    { id: 'notifications', title: 'الإشعارات', icon: 'bell' },
    { id: 'wallet', title: 'المحفظة', icon: 'wallet', forWorker: true },
    { id: 'language', title: 'اللغة', icon: 'globe' },
    { id: 'terms', title: 'الشروط والأحكام', icon: 'file-text' },
    { id: 'contact', title: 'اتصل بنا', icon: 'help-circle' }
  ];

  userData = {
    name: 'أحمد محمد',
    type: 'عضو ذهبي',
    phone: '01234567890',
    email: 'ahmed@example.com',
    rating: 4.8,
    completedJobs: 150,
    balance: 2500,
    addresses: [
      {
        id: 1,
        title: 'المنزل',
        details: 'شارع 9، المعادي، القاهرة',
        isDefault: true
      },
      {
        id: 2,
        title: 'العمل',
        details: 'شارع التحرير، وسط البلد، القاهرة',
        isDefault: false
      }
    ] as Address[]
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Any initialization logic
  }

  get userType() {
    return this.authService.getCurrentUser()?.type;
  }

  get filteredSections(): Section[] {
    return this.sections.filter(section => 
      !section.forWorker || (section.forWorker && this.userType === 'worker')
    );
  }

  toggleSection(sectionId: string): void {
    this.expandedSections[sectionId] = !this.expandedSections[sectionId];
  }

  setDefaultAddress(addressId: number): void {
    this.userData.addresses = this.userData.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/welcome']);
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { UserProfile, Address } from '../../interfaces/profile.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { DialogService } from '../../services/dialog.service';

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
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading = true;

  expandedSections: { [key: string]: boolean } = {
    personal: false,
    addresses: false,
    notifications: false,
    wallet: false,
    language: false,
    terms: false,
    contact: false
  };

  readonly sections = [
    { id: 'personal', title: 'المعلومات الشخصية', icon: 'user' },
    { id: 'addresses', title: 'العناوين', icon: 'map-pin' },
    { id: 'notifications', title: 'الإشعارات', icon: 'bell' },
    { id: 'wallet', title: 'المحفظة', icon: 'wallet', forWorker: true },
    { id: 'language', title: 'اللغة', icon: 'globe' },
    { id: 'terms', title: 'الشروط والأحكام', icon: 'file-text' },
    { id: 'contact', title: 'اتصل بنا', icon: 'headset' }
  ];

  readonly stats = [
    { id: 'rating', title: 'التقييم', value: 4.8 },
    { id: 'services', title: 'الخدمات', value: 150 },
    { id: 'balance', title: 'الرصيد', value: 2500 }
  ];

  userData: UserProfile = {
    id: '',
    name: '',
    email: '',
    phone: '',
    balance:0,
    type: 'worker',
    addresses: [],
    notificationSettings: [],
    languagePreference: 'ar'
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserProfile(): void {
    this.isLoading = true;
    this.profileService.getUserProfile()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (profile) => {
          this.userData = profile;
          this.updateStatsFromProfile();
        },
        error: (error) => console.error('Failed to load profile:', error)
      });
  }

  private updateStatsFromProfile(): void {
    if (this.userData.rating) {
      const ratingStats = this.stats.find(s => s.id === 'rating');
      if (ratingStats) ratingStats.value = this.userData.rating;
    }
    if (this.userData.balance) {
      const balanceStats = this.stats.find(s => s.id === 'balance');
      if (balanceStats) balanceStats.value = this.userData.balance;
    }
  }

  get userType() {
    return this.authService.getCurrentUser()?.type;
  }

  get isWorker() {
    return this.userType === 'worker';
  }

  get filteredSections() {
    return this.sections.filter(section => 
      !section.forWorker || (section.forWorker && this.isWorker)
    );
  }

  toggleSection(sectionId: string): void {
    this.expandedSections[sectionId] = !this.expandedSections[sectionId];
  }

  setDefaultAddress(addressId: number): void {
    this.profileService.setDefaultAddress(addressId)
      .subscribe({
        next: () => {
          this.userData.addresses = this.userData.addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === addressId
          }));
        },
        error: (error) => console.error('Error setting default address:', error)
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/welcome']);
  }

  onLanguageChange(language: string): void {
    this.profileService.updateLanguage(language)
      .subscribe({
        next: () => {
          this.userData.languagePreference = language;
        },
        error: (error) => console.error('Error updating language:', error)
      });
  }

  onTermsAcceptanceChange(accepted: boolean): void {
    // Handle terms acceptance
    console.log('Terms accepted:', accepted);
    // Add your terms acceptance logic here
  }

  onContactSubmit(data: any): void {
    // Handle contact form submission
    console.log('Contact form submitted:', data);
    // Add your contact form submission logic here
  }

  onUpdatePersonalInfo(data: Partial<UserProfile>): void {
    this.profileService.updateUserProfile(data)
      .subscribe({
        next: (updatedProfile) => {
          this.userData = updatedProfile;
          this.updateStatsFromProfile();
        },
        error: (error) => console.error('Error updating profile:', error)
      });
  }

  onSelectAddress(address: Address): void {
    // Handle address selection
    console.log('Selected address:', address);
    // Add your address selection logic here
  }

  onDeleteAddress(id: number): void {
    this.profileService.deleteAddress(id)
      .subscribe({
        next: () => {
          this.userData.addresses = this.userData.addresses.filter(addr => addr.id !== id);
        },
        error: (error) => console.error('Error deleting address:', error)
      });
  }
}
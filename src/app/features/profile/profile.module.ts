import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { NotificationsSettingsComponent } from './components/notifications-settings/notifications-settings.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { LanguageSettingsComponent } from './components/language-settings/language-settings.component';
import { TermsComponent } from './components/terms/terms.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AddAddressDialogComponent } from './components/addresses/add-address-dialog/add-address-dialog.component';
import { FaqComponent } from './components/faq/faq.component';
import { SharedModule } from '../../shared/shared.module';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { DialogService } from './services/dialog.service';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    ProfileComponent,
    PersonalInfoComponent,
    AddressesComponent,
    NotificationsSettingsComponent,
    WalletComponent,
    LanguageSettingsComponent,
    TermsComponent,
    ContactUsComponent,
    AddAddressDialogComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [DialogService, ProfileService],
})
export class ProfileModule { }
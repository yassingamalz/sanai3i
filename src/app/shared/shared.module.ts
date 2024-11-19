import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BackButtonComponent } from '../features/auth/components/back-button/back-button.component';
import { UrlSanitizerPipe } from './pipes/urlSanitizer.pipe';
import { RequestStatusPipe } from './pipes/request-status.pipe';
import { PriceNegotiationComponent } from './components/price-negotiation/price-negotiation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    NavBarComponent,
    SearchBarComponent,
    BackButtonComponent,
    PriceNegotiationComponent,
    UrlSanitizerPipe,
    RequestStatusPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavBarComponent,
    BackButtonComponent,
    SearchBarComponent,
    UrlSanitizerPipe,
    RequestStatusPipe,
  ]
})
export class SharedModule { }
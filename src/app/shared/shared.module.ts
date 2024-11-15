import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BackButtonComponent } from '../features/auth/components/back-button/back-button.component';
import { UrlSanitizerPipe } from './pipes/urlSanitizer.pipe';
import { RequestStatusPipe } from './pipes/request-status.pipe';

@NgModule({
  declarations: [
    NavBarComponent,
    SearchBarComponent,
    BackButtonComponent,
    UrlSanitizerPipe,
    RequestStatusPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports: [
    NavBarComponent,
    BackButtonComponent,
    SearchBarComponent,
    UrlSanitizerPipe,
    RequestStatusPipe
  ]
})
export class SharedModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BackButtonComponent } from '../features/auth/components/back-button/back-button.component';

@NgModule({
  declarations: [
    NavBarComponent,
    SearchBarComponent,
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports: [
    NavBarComponent,
    BackButtonComponent,
    SearchBarComponent
  ]
})
export class SharedModule { }
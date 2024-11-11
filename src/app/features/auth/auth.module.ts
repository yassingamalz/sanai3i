import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UserTypeComponent } from './pages/user-type/user-type.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    UserTypeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

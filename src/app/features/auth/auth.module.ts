import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UserTypeComponent } from './pages/user-type/user-type.component';
import { RegisterMethodComponent } from './pages/register-method/register-method.component';
import { EmailRegisterComponent } from './pages/email-register/email-register.component';
import { PhoneRegisterComponent } from './pages/phone-register/phone-register.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
import { OtpInputComponent } from './components/otp-input/otp-input.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    WelcomeComponent,
    UserTypeComponent,
    RegisterMethodComponent,
    EmailRegisterComponent,
    PhoneRegisterComponent,
    VerifyCodeComponent,
    CompleteProfileComponent,
    OtpInputComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AuthModule { }

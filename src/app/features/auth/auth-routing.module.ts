import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UserTypeComponent } from './pages/user-type/user-type.component';
import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
import { EmailRegisterComponent } from './pages/email-register/email-register.component';
import { PhoneRegisterComponent } from './pages/phone-register/phone-register.component';
import { RegisterMethodComponent } from './pages/register-method/register-method.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'user-type',
    component: UserTypeComponent
  },
  {
    path: 'register',
    component: RegisterMethodComponent
  },
  {
    path: 'register/email',
    component: EmailRegisterComponent
  },
  {
    path: 'register/phone',
    component: PhoneRegisterComponent
  },
  {
    path: 'verify',
    component: VerifyCodeComponent
  },
  {
    path: 'complete-profile',
    component: CompleteProfileComponent
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkerDetailsComponent } from './pages/worker-details/worker-details.component';
import { BackButtonComponent } from '../auth/components/back-button/back-button.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    WorkerDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ]
})
export class HomeModule { }
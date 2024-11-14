import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { WorkerDetailsComponent } from './pages/worker-details/worker-details.component';
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
      },
      {
        path: 'worker/:id',
        component: WorkerDetailsComponent,
        data: { scrollPositionRestoration: 'top' }
      }
    ])
  ]
})
export class HomeModule { }
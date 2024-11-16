import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { WorkerDetailsComponent } from './pages/worker-details/worker-details.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FeaturedSliderComponent } from '../../shared/components/featured-slider/featured-slider.component';

@NgModule({
  declarations: [
    HomeComponent,
    WorkerDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
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
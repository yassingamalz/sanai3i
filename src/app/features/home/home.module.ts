import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { WorkerDetailsComponent } from './pages/worker-details/worker-details.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FeaturedSliderComponent } from './components/featured-slider/featured-slider.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { ServicesGridComponent } from './components/services-grid/services-grid.component';
import { TopWorkersComponent } from './components/top-workers/top-workers.component';
import { TrendingServicesComponent } from './components/trending-services/trending-services.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';

@NgModule({
  declarations: [
    HomeComponent,
    WorkerDetailsComponent,
    SearchHeaderComponent,
    ServicesGridComponent,
    TopWorkersComponent,
    TrendingServicesComponent,
    SectionHeaderComponent,
    FeaturedSliderComponent,
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
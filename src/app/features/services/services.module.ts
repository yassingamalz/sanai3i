import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesListComponent } from './pages/services-list/services-list.component';
import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ServicesListComponent,
    RequestsListComponent,
    ServiceDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: RequestsListComponent },
      {
        path: 'all-services',
        component: ServicesListComponent
      },
      {
        path: ':id',
        component: ServiceDetailsComponent
      }
    ])
  ]
})
export class ServicesModule { }
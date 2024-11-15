import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesListComponent } from './pages/services-list/services-list.component';
import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { SubServiceComponent } from './pages/sub-service/sub-service.component';

@NgModule({
  declarations: [
    ServicesListComponent,
    RequestsListComponent,
    ServiceDetailsComponent,
    NewRequestComponent,
    SubServiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'all-services',
        component: ServicesListComponent
      },
      {
        path: ':id',
        component: ServiceDetailsComponent
      },
      { path: ':mainId/sub-service/:subId',
         component: SubServiceComponent }
    ])
  ]
})
export class ServicesModule { }
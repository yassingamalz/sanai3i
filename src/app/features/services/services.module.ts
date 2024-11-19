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
import { ServicesHeaderComponent } from './components/services-header/services-header.component';
import { ServicesSearchComponent } from './components/services-search/services-search.component';
import { ServicesGridComponent } from './components/services-grid/services-grid.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { ServiceHeaderComponent } from './components/service-details/service-header/service-header.component';
import { ServiceOverviewComponent } from './components/service-details/service-overview/service-overview.component';
import { ServiceItemsComponent } from './components/service-details/service-items/service-items.component';
import { RelatedServicesComponent } from './components/service-details/related-services/related-services.component';
import { TopServiceProvidersComponent } from './components/service-details/top-service-providers/top-service-providers.component';

@NgModule({
  declarations: [
    ServicesListComponent,
    RequestsListComponent,
    ServiceDetailsComponent,
    NewRequestComponent,
    SubServiceComponent,
    ServicesHeaderComponent,
    ServicesSearchComponent,
    ServicesGridComponent,
    ServiceCardComponent,
    NoResultsComponent,
    ServiceHeaderComponent,
    ServiceOverviewComponent,
    ServiceItemsComponent,
    RelatedServicesComponent,
    TopServiceProvidersComponent
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
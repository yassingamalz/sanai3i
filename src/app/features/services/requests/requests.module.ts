import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewRequestComponent } from '../pages/new-request/new-request.component';
import { RequestsListComponent } from '../pages/requests-list/requests-list.component';
import { RequestDetailsComponent } from '../../requests/pages/request-details/request-details.component';
import { RequestStatusPipe } from '../../../shared/pipes/request-status.pipe';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [RequestDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: RequestsListComponent },
      { path: 'new-request', component: NewRequestComponent },
      { path: ':id', component: RequestDetailsComponent },
    ])
  ]
})
export class RequestsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { RequestsListComponent } from './pages/requests-list/requests-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RequestsListComponent },
      { path: 'new-request', component: NewRequestComponent },
    ])
  ]
})
export class RequestsModule { }

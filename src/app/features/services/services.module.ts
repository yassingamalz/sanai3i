import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesListComponent } from './pages/services-list/services-list.component';

@NgModule({
  declarations: [
    ServicesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ServicesListComponent }
    ])
  ]
})
export class ServicesModule { }
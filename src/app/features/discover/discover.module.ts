import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverComponent } from './pages/discover/discover.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DiscoverComponent
      }
    ]),
  ]
})
export class DiscoverModule { }

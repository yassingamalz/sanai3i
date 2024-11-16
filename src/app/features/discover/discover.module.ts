// discover.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DiscoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    LeafletModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: DiscoverComponent, data: { reuseComponent: false } }
    ])
  ]
})
export class DiscoverModule { }
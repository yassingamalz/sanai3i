// discover.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DiscoverComponent],
  imports: [
    CommonModule,
    FormsModule,
    LeafletModule,
    RouterModule.forChild([
      { path: '', component: DiscoverComponent }
    ])
  ]
})
export class DiscoverModule { }
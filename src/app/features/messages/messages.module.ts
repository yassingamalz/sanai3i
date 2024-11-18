import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { MessageDetailComponent } from './components/message-detail/message-detail.component';
import { MessagesComponent } from './pages/messages/messages.component';

@NgModule({
  declarations: [
    MessagesComponent,
    MessageDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: MessagesComponent },
      { path: ':id', component: MessageDetailComponent }
    ])
  ],
  providers: []
})
export class MessagesModule { }
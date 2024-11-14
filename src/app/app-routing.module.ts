  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
  import { AuthGuard } from './core/guards/auth.guard';
import { WorkerDetailsComponent } from './features/home/pages/worker-details/worker-details.component';

  const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'profile',
          loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'services',
          loadChildren: () => import('./features/services/services.module').then(m => m.ServicesModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'messages',
          loadChildren: () => import('./features/messages/messages.module').then(m => m.MessagesModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'discover',
          loadChildren: () => import('./features/discover/discover.module').then(m => m.DiscoverModule),
          canActivate: [AuthGuard]
        },
        { path: 'worker/:id', component: WorkerDetailsComponent },
      ]
    },
    {
      path: 'auth',
      loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
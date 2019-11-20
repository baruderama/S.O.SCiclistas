import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { 
    path: '', redirectTo: 'emergencies', pathMatch: 'full' 
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule'
  },
  {
    path: 'emergencies',
    loadChildren: './emergencies/emergencies.module#EmergenciesPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatPageModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

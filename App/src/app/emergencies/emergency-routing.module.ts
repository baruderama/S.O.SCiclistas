import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmergenciesPage } from './emergencies.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: EmergenciesPage,
    children: [
      {
        path: 'find',
        children: [
          {
            path: '',
            loadChildren: './find/find.module#FindPageModule'
          },
          {
            path: ':emergencyId',
            loadChildren:
              './find/emergency-detail/emergency-detail.module#EmergencyDetailPageModule'
          }
        ]
      },
      {
        path: 'my-emergencies',
        children: [
          {
            path: '',
            loadChildren: './my-emergencies/my-emergencies.module#MyEmergenciesPageModule'
          },
          {
            path: 'new-emergency',
            loadChildren:
              './my-emergencies/new-emergency/new-emergency.module#NewEmergencyPageModule'
          },
          {
            path: 'other-emergencies',
            loadChildren:
              './my-emergencies/other-emergencies/other-emergencies.module#OtherEmergenciesPageModule'
          },
          {
            path: 'edit-emergency/:emergencyId',
            loadChildren:
              './my-emergencies/edit-emergency/edit-emergency.module#EditEmergencyPageModule'
          },
        ]
      },
      {
        path: '',
        redirectTo: '/emergencies/tabs/find',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/emergencies/tabs/find',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: EmergenciesPage,
    children: [
      {
        path: 'admin-find',
        children: [
          {
            path: '',
            loadChildren: './admin-find/admin-find.module#AdminFindPageModule'
          },
          {
            path: ':emergencyId',
            loadChildren:
              './admin-find/detail/detail.module#DetailPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/emergencies/tabs/admin-find',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'other-emergencies', loadChildren: './my-emergencies/other-emergencies/other-emergencies.module#OtherEmergenciesPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyRoutingModule {}

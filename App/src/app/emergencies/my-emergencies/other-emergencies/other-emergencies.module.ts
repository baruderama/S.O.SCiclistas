import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';

import { OtherEmergenciesPage } from './other-emergencies.page';

const routes: Routes = [
  {
    path: '',
    component: OtherEmergenciesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [OtherEmergenciesPage]
})
export class OtherEmergenciesPageModule {}

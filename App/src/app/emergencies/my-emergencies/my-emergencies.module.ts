import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyEmergenciesPage } from './my-emergencies.page';

const routes: Routes = [
  {
    path: '',
    component: MyEmergenciesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyEmergenciesPage]
})
export class MyEmergenciesPageModule {}

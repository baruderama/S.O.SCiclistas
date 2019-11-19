import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EmergenciesPage } from './emergencies.page';
import { EmergencyRoutingModule } from './emergency-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EmergencyRoutingModule
  ],
  declarations: [EmergenciesPage]
})
export class EmergenciesPageModule { }

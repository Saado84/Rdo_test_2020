import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PizzeriaPageRoutingModule } from './pizzeria-routing.module';

import { PizzeriaPage } from './pizzeria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PizzeriaPageRoutingModule
  ],
  declarations: [PizzeriaPage]
})
export class PizzeriaPageModule {}

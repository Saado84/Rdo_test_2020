import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbracadabrasyPageRoutingModule } from './abracadabrasy-routing.module';

import { AbracadabrasyPage } from './abracadabrasy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbracadabrasyPageRoutingModule
  ],
  declarations: [AbracadabrasyPage]
})
export class AbracadabrasyPageModule {}

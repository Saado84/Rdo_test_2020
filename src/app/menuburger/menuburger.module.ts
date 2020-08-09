import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuburgerPageRoutingModule } from './menuburger-routing.module';

import { MenuburgerPage } from './menuburger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuburgerPageRoutingModule
  ],
  declarations: [MenuburgerPage]
})
export class MenuburgerPageModule {}

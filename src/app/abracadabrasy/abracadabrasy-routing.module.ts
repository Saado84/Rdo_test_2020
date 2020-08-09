import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbracadabrasyPage } from './abracadabrasy.page';

const routes: Routes = [
  {
    path: '',
    component: AbracadabrasyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbracadabrasyPageRoutingModule {}

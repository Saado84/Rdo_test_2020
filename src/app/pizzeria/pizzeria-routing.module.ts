import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzeriaPage } from './pizzeria.page';

const routes: Routes = [
  {
    path: '',
    component: PizzeriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzeriaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuburgerPage } from './menuburger.page';

const routes: Routes = [
  {
    path: '',
    component: MenuburgerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuburgerPageRoutingModule {}

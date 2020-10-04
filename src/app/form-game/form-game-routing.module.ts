import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormGamePage } from './form-game.page';

const routes: Routes = [
  {
    path: '',
    component: FormGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormGamePageRoutingModule {}

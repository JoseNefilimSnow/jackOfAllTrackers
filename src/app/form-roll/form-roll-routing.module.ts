import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRollPage } from './form-roll.page';

const routes: Routes = [
  {
    path: '',
    component: FormRollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRollPageRoutingModule {}

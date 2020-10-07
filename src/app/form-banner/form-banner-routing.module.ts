import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormBannerPage } from './form-banner.page';

const routes: Routes = [
  {
    path: '',
    component: FormBannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormBannerPageRoutingModule {}

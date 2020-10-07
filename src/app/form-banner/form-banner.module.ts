import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormBannerPageRoutingModule } from './form-banner-routing.module';

import { FormBannerPage } from './form-banner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormBannerPageRoutingModule
  ],
  declarations: [FormBannerPage]
})
export class FormBannerPageModule { }

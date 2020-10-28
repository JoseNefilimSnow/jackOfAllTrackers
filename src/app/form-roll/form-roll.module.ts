import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRollPageRoutingModule } from './form-roll-routing.module';

import { FormRollPage } from './form-roll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormRollPageRoutingModule
  ],
  declarations: [FormRollPage]
})
export class FormRollPageModule { }

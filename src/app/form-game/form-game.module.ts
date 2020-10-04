import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormGamePageRoutingModule } from './form-game-routing.module';

import { FormGamePage } from './form-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormGamePageRoutingModule
  ],
  declarations: [FormGamePage]
})
export class FormGamePageModule { }

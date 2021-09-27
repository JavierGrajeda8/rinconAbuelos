import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosPageRoutingModule } from './gastos-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastosPageRoutingModule
  ],
  declarations: []
})
export class GastosAppPageModule {}

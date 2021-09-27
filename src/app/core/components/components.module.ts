import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [ HeaderComponent],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [HeaderComponent],
})
export class ComponentsModule {}

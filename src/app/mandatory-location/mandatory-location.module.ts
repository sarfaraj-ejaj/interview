import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MandatoryLocationPageRoutingModule } from './mandatory-location-routing.module';

import { MandatoryLocationPage } from './mandatory-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MandatoryLocationPageRoutingModule
  ],
  declarations: [MandatoryLocationPage]
})
export class MandatoryLocationPageModule {}

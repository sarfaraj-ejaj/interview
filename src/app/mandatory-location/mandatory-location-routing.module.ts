import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MandatoryLocationPage } from './mandatory-location.page';

const routes: Routes = [
  {
    path: '',
    component: MandatoryLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MandatoryLocationPageRoutingModule {}

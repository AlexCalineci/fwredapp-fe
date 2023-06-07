import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DonationMapComponent} from "./donation-map.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DonationMapComponent }
  ])],
  exports: [RouterModule]
})
export class DonationMapRoutingModule { }

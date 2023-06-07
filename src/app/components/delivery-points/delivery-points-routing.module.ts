import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DeliveryPointsComponent} from "./delivery-points.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DeliveryPointsComponent }
  ])],
  exports: [RouterModule]
})
export class DeliveryPointsRoutingModule { }

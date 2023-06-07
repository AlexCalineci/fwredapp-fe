import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ReservationsComponent} from "./reservations.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ReservationsComponent }
  ])],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }

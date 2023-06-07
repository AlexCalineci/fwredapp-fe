import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DiscountsComponent} from "./discounts.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DiscountsComponent }
  ])],
  exports: [RouterModule]
})
export class DiscountsRoutingModule { }

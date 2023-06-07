import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FoodItemsComponent} from "./food-items.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FoodItemsComponent }
  ])],
  exports: [RouterModule]
})
export class FoodItemsRoutingModule { }

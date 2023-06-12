import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FeedbackRatingsComponent} from "./feedback-ratings.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FeedbackRatingsComponent }
  ])],
  exports: [RouterModule]
})
export class FeedbackRatingsRoutingModule { }

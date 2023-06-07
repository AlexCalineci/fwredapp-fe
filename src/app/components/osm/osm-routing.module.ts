import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {OsmComponent} from "./osm.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: OsmComponent }
  ])],
  exports: [RouterModule]
})
export class OsmRoutingModule { }

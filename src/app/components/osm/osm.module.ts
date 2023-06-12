import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OsmComponent} from "./osm.component";
import {OsmRoutingModule} from "./osm-routing.module";
import {OsmService} from "../../services/osm.service";
import {OsmFacade} from "../../services/osm.facade";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
    imports: [
        CommonModule,
        OsmRoutingModule,
        DropdownModule,
    ],
  exports: [
    OsmComponent
  ],
  providers:[
    OsmService,
    OsmFacade
  ],
  declarations: [OsmComponent]
})
export class OsmModule {}

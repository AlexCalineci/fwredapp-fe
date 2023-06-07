import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import {DonationMapComponent} from "./donation-map.component";
import {ProgressBarModule} from "primeng/progressbar";
import {SliderModule} from "primeng/slider";
import {TableModule} from "primeng/table";
import {DonationMapRoutingModule} from "./donation-map-routing.module";
import {AddressModule} from "../address/address.module";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";
import {OsmModule} from "../osm/osm.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    ProgressBarModule,
    SliderModule,
    TableModule,
    DonationMapRoutingModule,
    ConfirmPopupModule,
    ToastModule,
    AddressModule,
    OsmModule
  ],
  declarations: [DonationMapComponent]
})
export class DonationMapModule { }

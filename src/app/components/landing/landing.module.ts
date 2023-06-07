import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import {OsmModule} from "../osm/osm.module";
import {AuthModule} from "../auth/auth.module";
import {AddressModule} from "../address/address.module";


@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    DividerModule,
    StyleClassModule,
    ChartModule,
    PanelModule,
    ButtonModule,
    OsmModule,
    AuthModule,
    AddressModule
  ],
    declarations: [LandingComponent],
})
export class LandingModule { }

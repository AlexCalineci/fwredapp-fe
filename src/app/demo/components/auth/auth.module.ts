import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {DashboardModule} from "../../../components/dashboard/dashboard.module";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }

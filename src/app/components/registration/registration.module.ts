import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import {RegistrationRoutingModule} from './registration-routing.module';
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
import {AddressModule} from "../address/address.module";
import {RippleModule} from "primeng/ripple";
import {UsersFacade} from "../../services/users.facade";
import {MessageService} from "primeng/api";
import { ToastModule } from 'primeng/toast';
import {MessageModule} from "primeng/message";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRoutingModule,
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
    AddressModule,
    RippleModule,
    ToastModule,
    MessageModule
  ],
  providers: [UsersFacade, MessageService],
  declarations: [RegistrationComponent],
})
export class RegistrationModule {}

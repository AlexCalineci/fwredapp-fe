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
import {FeedbackRatingsComponent} from "./feedback-ratings.component";
import {ProgressBarModule} from "primeng/progressbar";
import {SliderModule} from "primeng/slider";
import {TableModule} from "primeng/table";
import {FeedbackRatingsRoutingModule} from "./feedback-ratings-routing.module";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RippleModule} from "primeng/ripple";
import {RatingModule} from "primeng/rating";

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
    FeedbackRatingsRoutingModule,
    ConfirmPopupModule,
    ToastModule,
    ConfirmDialogModule,
    RippleModule,
    RatingModule,
  ],
  declarations: [FeedbackRatingsComponent],
})
export class FeedbackRatingsModule {}

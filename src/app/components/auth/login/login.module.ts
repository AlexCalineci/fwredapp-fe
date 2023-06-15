import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {JwtInterceptor} from "../../../services/JwtInterceptor";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ToastModule,
    MessageModule,
  ],
  providers: [MessageService,JwtInterceptor],
  declarations: [LoginComponent],
})
export class LoginModule {}

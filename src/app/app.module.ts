import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './components/layout/app.layout.module';
import { IconService } from './services/icon.service';
import {LandingModule} from "./components/landing/landing.module";
import {AuthModule} from "./components/auth/auth.module";
import {AddressModule} from "./components/address/address.module";
import {AuthGuard} from "./services/authguard";
import {UsersFacade} from "./services/users.facade";
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {JwtInterceptorService} from "./services/jwtInterceptor.service";


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        LandingModule,
        AuthModule,
        AddressModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
           IconService,AuthGuard,UsersFacade,JwtInterceptorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

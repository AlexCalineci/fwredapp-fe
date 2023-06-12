import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './components/layout/app.layout.module';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {LandingModule} from "./components/landing/landing.module";
import {AuthModule} from "./components/auth/auth.module";
import {AddressModule} from "./components/address/address.module";
import {AuthGuard} from "./services/authguard";
import {UsersFacade} from "./services/users.facade";
import {NotfoundComponent} from "./notfound/notfound.component";


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
          EventService, IconService, NodeService,
          PhotoService,AuthGuard,UsersFacade
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

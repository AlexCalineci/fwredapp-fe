import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,private router: Router,private authService:AuthService) { }

    ngOnInit() {

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        this.authService.setToken(accessToken);
      }

      this.primengConfig.ripple = true;
    }
}

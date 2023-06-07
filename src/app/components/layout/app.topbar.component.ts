import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {UsersFacade} from "../../services/users.facade";
import {Users} from "../../model/Users";
import {Registration} from "../../model/Registration";
import {switchMap} from "rxjs";
import {UserType} from "../../model/UserType";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;


  authenticatedUser: String|undefined = '';
  constructor(
    public layoutService: LayoutService,
  ) {

  }

  ngOnInit() {
    this.items = [
      { label: 'Logout', icon: 'pi pi-external-link', routerLink:['/auth/login'] },

    ];
  }


}

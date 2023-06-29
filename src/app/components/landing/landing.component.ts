import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/components/layout/service/app.layout.service';
import {OsmFacade} from "../../services/osm.facade";
import {take} from "rxjs";
import {tap} from "rxjs/operators";
import {UsersFacade} from "../../services/users.facade";
import {OsmComponent} from "../osm/osm.component";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  orgId:number|null = 0;
  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private osmFacade:OsmFacade,
    private userFacade:UsersFacade,
    private osmComponent:OsmComponent
  ) {
  }

  ngOnInit() {
    this.userFacade.authenticatedUser$
      .pipe(
        tap((user) => {
          if (user?.roles.includes('DONOR')) {
            this.orgId = user.orgId;
          } else {
            this.orgId = null;
          }
        }),
        take(1)
      )
      .subscribe();

    this.osmComponent.initializeMap(this.orgId);
  }
}

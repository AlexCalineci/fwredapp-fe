import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OsmFacade } from '../../services/osm.facade';
import {Observable, take} from 'rxjs';
import {tap} from "rxjs/operators";
import {OsmComponent} from "../osm/osm.component";
import {UsersFacade} from "../../services/users.facade";

@Component({
  templateUrl: './delivery-points.component.html',
  providers: [MessageService, ConfirmationService],
})
export class DeliveryPointsComponent implements OnInit {
  loading: boolean = true;
  orgId:number|null = 0;
  isMapInitialized$: Observable<boolean | null>;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private osmFacade: OsmFacade,
    private osmComponent:OsmComponent,
    private userFacade:UsersFacade
  ) {
    this.isMapInitialized$ = this.osmFacade.isMapInitialized$;
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

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { tap } from 'rxjs/operators';
import { take } from 'rxjs';
import { UsersFacade } from '../../services/users.facade';
import { OsmComponent } from '../osm/osm.component';

@Component({
  templateUrl: './donation-map.component.html',
  providers: [MessageService, ConfirmationService],
})
export class DonationMapComponent implements OnInit {
  orgId: number | null = 0;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userFacade: UsersFacade,
    private osmComponent: OsmComponent
  ) {}

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

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}

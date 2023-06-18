import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Discounts } from '../../model/Discounts';
import { UsersFacade } from '../../services/users.facade';
import { DiscountsService } from '../../services/discounts.service';
import { tap } from 'rxjs/operators';
import {Organizations} from "../../model/Organization";
import {OrganizationsService} from "../../services/organizations.service";

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  templateUrl: './admin.component.html',
  providers: [MessageService,ConfirmationService]
})
export class AdminComponent implements OnInit {
  orgId: number | undefined = 0;

  organizationsList: Organizations[] = [];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userFacade: UsersFacade,
    private organizationService:OrganizationsService
  ) {}

  ngOnInit() {

    this.loadOrganizationsList();
  }

  private formatDate(date: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  loadOrganizationsList(): void {
    this.loading = true;
    this.organizationService.getAllOrganizations().subscribe({
      next: (organizations) => {
        this.organizationsList = organizations;
        console.log(this.organizationsList);
        this.loading = false;
      },
    });
  }
  activate(organization: Organizations): void {
     this.confirmationService.confirm({
      message: 'Are you sure you want to activate this organization?',
      accept: () => {
        this.organizationService.activateOrganization(organization).subscribe({
          complete: () => {
            this.messageService.add({
              key: 'successMessage',
              severity: 'success',
              summary: 'Organization activated',
              detail: 'The organization was activated',
            });

            setTimeout(() => 2000);
            this.loadOrganizationsList();
          },
          error: () => {
            this.messageService.add({
              key: 'errorMessage',
              severity: 'error',
              summary: 'Organization activation failed',
              detail: 'The organization activation failed',
            });
          },
        });
      },
      reject: () => {
        // Do nothing if deletion is canceled
      },
    });
  }

  confirmInactivationForOrg(organization: Organizations) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to inactivate this organization?',
      accept: () => {
          this.organizationService.inactivateOrganization(organization).subscribe({
            complete: () => {
              this.messageService.add({
                key: 'successMessage',
                severity: 'success',
                summary: 'Organization inactivated',
                detail: 'Organization successfully inactivated!',
              });

              setTimeout(() => 2000);
              this.loadOrganizationsList();
            },
            error: () => {
              this.messageService.add({
                key: 'errorMessage',
                severity: 'error',
                summary: 'Organization inactivation failed!',
                detail: 'Organization was not inactivated!',
              });
            },
          });
      },
      reject: () => {
        // Do nothing if deletion is canceled
      },
    });
  }

}

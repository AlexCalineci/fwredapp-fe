import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FeedbackRating } from '../../model/FeedbackRating';
import { Reservations } from '../../model/Reservations';
import { Organizations } from '../../model/Organization';
import { ReservationsService } from '../../services/reservations.service';
import { OrganizationsService } from '../../services/organizations.service';
import { tap } from 'rxjs/operators';
import { UsersFacade } from '../../services/users.facade';
import {FeedbackRatingsService} from "../../services/feedback-ratings.service";



@Component({
  templateUrl: './feedback-ratings.component.html',
  providers: [MessageService, ConfirmationService],

})
export class FeedbackRatingsComponent implements OnInit {
  loading: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  feedbackInput: FeedbackRating = <FeedbackRating>{};
  feedbackList: FeedbackRating[] = [];
  reservationsList: Reservations[] = [];
  organizationList: Organizations[] = [];

  orgId: number | undefined = 0;
  userRoles: Array<string> | undefined = [];
  currentRole: string | undefined = '';
  selectedOrganization: Organizations | null = null;
  selectedReservation: Reservations | null = null;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reservationService: ReservationsService,
    private organizationService: OrganizationsService,
    private userFacade: UsersFacade,
    private feedbackService:FeedbackRatingsService
  ) {}

  ngOnInit() {
    this.userFacade.authenticatedUser$
      .pipe(
        tap((user) => {
          this.orgId = user?.orgId;
          this.userRoles = user?.roles;
          this.currentRole = user?.roles[0];
        })
      )
      .subscribe();
    this.organizationService.getOrganizationByType(this.currentRole == 'RECEIVER'?'DONOR':'RECEIVER').subscribe((organizations) => {
      this.selectedOrganization = organizations[0];
      this.reservationService
        .loadReservationsForFeedback(this.selectedOrganization.orgId, this.orgId)
        .subscribe((reservations) => {
          this.reservationsList = reservations;
          this.reservationsList = this.reservationsList.map(reservation => ({
            ...reservation,
            displayLabel: `Reservation ID: ${reservation.reservationId}, Food Item: ${reservation.foodItemName}, Quantity: ${reservation.quantity}`
          }));
        });
      this.organizationList = organizations;
    });
    this.feedbackService.loadFeedback(this.orgId,this.currentRole).subscribe(feedbackList =>this.feedbackList = feedbackList);
  }

  onOrganizationChange(event: any) {
    console.log(event);
    this.selectedOrganization = event.value;
    if (this.selectedOrganization) {
      this.reservationService
        .loadReservationsForFeedback(this.orgId,this.selectedOrganization.orgId)
        .subscribe((reservations) => {
          this.reservationsList = reservations;
          this.reservationsList = this.reservationsList.map(reservation => ({
            ...reservation,
            displayLabel: `Reservation ID: ${reservation.reservationId}, Food Item: ${reservation.foodItemName}, Quantity: ${reservation.quantity}`
          }));
        });
    } else {
      this.reservationsList = [];
    }
  }

  submitFeedback(feedback: FeedbackRating): void {
    feedback.raterOrgId = this.orgId;
    feedback.ratedOrgId = this.selectedOrganization?.orgId;
    feedback.reservationId = this.selectedReservation?.reservationId;
    console.log("Rate",feedback.starRating);
    this.feedbackService.addFeedback(feedback).subscribe({
      complete: () => {
        this.messageService.add({
          key: 'successMessage',
          severity: 'success',
          summary: 'Feedback Saved',
          detail: 'Feedback rate was saved!',
        });

        setTimeout(() => 2000);
        this.feedbackService.loadFeedback(this.orgId,this.currentRole).subscribe(feedbackList =>this.feedbackList = feedbackList);
      },
      error: () => {
        this.messageService.add({
          key: 'errorMessage',
          severity: 'error',
          summary: 'Feedback rate failed!',
          detail: 'Feedback was not saved!!',
        });
      },
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  canRate(selectedReservation:Reservations|null):boolean{
    if (selectedReservation){
      return true;
    }else
      return false;
  }

  public hasRole(role: string): boolean {
    // @ts-ignore
    return this.userRoles.includes(role);
  }
}

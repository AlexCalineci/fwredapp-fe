import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ReservationsService } from '../../services/reservations.service';
import { Reservations } from '../../model/Reservations';
import { tap } from 'rxjs/operators';
import { UsersFacade } from '../../services/users.facade';
import { Router } from '@angular/router';
import { ReservationsRoutingModule } from './reservations-routing.module';

@Component({
  templateUrl: './reservations.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  reservation: Reservations = <Reservations>{};
  reservationList: Reservations[] = [];
  loading: boolean = true;
  orgId: number | undefined = 0;
  userRoles: Array<string> | undefined = [];
  foodItemReservation: any = {};
  showReservationModal: boolean = false;
  currentRole: string | undefined = '';
  @ViewChild('filter') filter!: ElementRef;

  editingReservation: ReservationsRoutingModule | null = null;
  clearAndAddVisible = false;
  editingItem: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private reservationService: ReservationsService,
    private userFacade: UsersFacade,
    private router: Router
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
    this.loadReservationItemList(this.orgId, this.currentRole);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  loadReservationItemList(
    orgId: number | undefined,
    userType: string | undefined
  ): void {
    this.loading = true;
    this.reservationService.loadReservations(orgId, userType).subscribe({
      next: (reservation) => {
        this.reservationList = reservation;
        console.log(this.reservationList);
        this.loading = false;
      },
    });
  }

  modifyReservation(foodItemReservation: any) {
    this.reservationService.editReservation(foodItemReservation).subscribe({
      complete: () => {
        this.showReservationModal = false;
        this.loadReservationItemList(this.orgId, this.currentRole);
      },
      error: () => {
        this.messageService.add({
          key: 'errorMessage',
          severity: 'error',
          summary: 'Modification failed!',
          detail: 'Reservation modification failed!',
        });
      },
    });
  }

  openReservationModal(reservation: Reservations) {
    console.log('Reservation', reservation);
    this.foodItemReservation = {
      name: reservation.foodItemName,
      foodItemId: reservation.foodItemId,
      quantity: null,
      reservationId:reservation.reservationId,
      currentAvailableQuantity: reservation.availableQuantity,
    };
    console.log('Food items reservations', this.foodItemReservation);
    this.showReservationModal = true;
  }

  cancelModification() {
    this.foodItemReservation = {};
    this.showReservationModal = false;
  }

  public hasRole(role: string): boolean {
    // @ts-ignore
    return this.userRoles.includes(role);
  }

  editReservation(reservation: Reservations) {
    this.editingReservation = { ...reservation };
    this.reservation = {
      ...reservation,
    };
    this.clearAndAddVisible = true;
    this.editingItem = true;
    this.openReservationModal(this.reservation);
  }

  confirmCancelReservation(reservation: Reservations) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel this reservation?',
      accept: () => {
        this.reservationService
          .cancelRservation(reservation.reservationId)
          .subscribe({
            complete: () => {
              this.messageService.add({
                key: 'successMessage',
                severity: 'success',
                summary: 'Reservation cancelled',
                detail: 'Reservation was set to CANCELLED!',
              });

              setTimeout(() => 2000);
              this.loadReservationItemList(this.orgId, this.currentRole);
            },
            error: () => {
              this.messageService.add({
                key: 'errorMessage',
                severity: 'error',
                summary: 'Reservation cancel failed!',
                detail: 'Reservation was not cancelled!',
              });
            },
          });
      },
      reject: () => {},
    });
  }

  checkReservationVality(foodItemReservation:any):boolean{
    if(foodItemReservation.currentAvailableQuantity < foodItemReservation.quantity || foodItemReservation.quantity < 1){
      return true ;
    }
    return false;
  }

  finaliseReservation(reservation: Reservations) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to finalise this reservation?',
      accept: () => {
        this.reservationService
          .finaliseReservation(reservation.reservationId)
          .subscribe({
            complete: () => {
              this.messageService.add({
                key: 'successMessage',
                severity: 'success',
                summary: 'Reservation finalised!',
                detail: 'Reservation was set to FINALISED!',
              });

              setTimeout(() => 2000);
              this.loadReservationItemList(this.orgId, this.currentRole);
            },
            error: () => {
              this.messageService.add({
                key: 'errorMessage',
                severity: 'error',
                summary: 'Reservation not finalised!',
                detail: 'Reservation was not set to FINALISED!',
              });
            },
          });
      },
      reject: () => {},
    });
  }
}

import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {FoodItems} from "../model/FoodItems";
import {Reservations} from "../model/Reservations";
import {Regions} from "../model/Regions";



@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(private http: HttpClient,private authService:AuthService) {}

  private getHttpOptions(): { headers: HttpHeaders } {
    const authToken = this.authService.getAuthToken();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken ? `Bearer ${authToken}` : '',
      }),
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => new Error(JSON.stringify(error.error)));
  }

  addReservation(foodItem: any): Observable<any> {
    let JsonInput = {
      foodItemId:foodItem.foodItemId,
      quantity: foodItem.quantity,
      donorOrgId:foodItem.donorOrgId,
      receiverOrgId:foodItem.receiverOrgId,
      listPrice:foodItem.listPrice,
      discountPercentage: foodItem.discountPercentage
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<any>(
        environment.BASE_URL + '/reservation/add',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  editReservation(reservation: Reservations): Observable<Reservations> {
    let JsonInput = {
      reservationId:reservation.reservationId,
      quantity: reservation.quantity,
      foodItemId:reservation.foodItemId
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Reservations>(
        environment.BASE_URL + '/reservation/edit',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  loadReservations(orgId: number | undefined,orgType:string|undefined): Observable<Reservations[]> {
    let JsonInput = {
      orgId: orgId,
      orgType: orgType,
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Reservations[]>(
        environment.BASE_URL + '/reservation/show',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  loadReservationsForFeedback(receiverOrgId: number | undefined,donorOrgId:number|undefined): Observable<Reservations[]> {
    return this.http.get<Reservations[]>( `${environment.BASE_URL + '/reservation/show'}/${donorOrgId}/${receiverOrgId}`);
  }

  cancelRservation(reservationId:number|null): Observable<Reservations> {
    let JsonInput = {
      reservationId: reservationId,
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Reservations>(
        environment.BASE_URL + '/reservation/cancel',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }
  finaliseReservation(reservationId:number|null): Observable<Reservations> {
    let JsonInput = {
      reservationId: reservationId,
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Reservations>(
        environment.BASE_URL + '/reservation/finalise',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

}

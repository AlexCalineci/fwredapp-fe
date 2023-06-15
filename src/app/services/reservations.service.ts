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

  editFoodItem(foodItem: FoodItems): Observable<FoodItems> {
    let JsonInput = {
      discountId:foodItem.discountId,
      quantityType:foodItem.quantityType,
      name:foodItem.name,
      availableQuantity:foodItem.availableQuantity,
      deliveryPointId:foodItem.deliveryPointId,
      expirationDate:foodItem.expirationDate,
      listPrice:foodItem.listPrice,
      description:foodItem.description
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<FoodItems>(
        environment.BASE_URL + '/fooditems/edit',
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

  deleteFoodItems(foodItemId:number|null): Observable<FoodItems[]> {
    let JsonInput = {
      foodItemId: foodItemId,
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<FoodItems[]>(
        environment.BASE_URL + '/fooditems/delete',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }
}

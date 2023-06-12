import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {FoodItems} from "../model/FoodItems";



@Injectable({
  providedIn: 'root',
})
export class FoodItemsService {
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

  addNewFoodItem(foodItem: FoodItems): Observable<FoodItems> {
    let JsonInput = {
      discountId:foodItem.discountId,
      quantityType:foodItem.quantityType,
      name:foodItem.name,
      availableQuantity:foodItem.availableQuantity,
      deliveryPointId:foodItem.deliveryPointId,
      expirationDate:foodItem.expirationDate,
      orgId:foodItem.orgId,
      listPrice:foodItem.listPrice,
      description:foodItem.description

    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<FoodItems>(
        environment.BASE_URL + '/fooditems/add',
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

  loadFoodItems(orgId: number | undefined): Observable<FoodItems[]> {
    let JsonInput = {
      orgId: orgId,
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<FoodItems[]>(
        environment.BASE_URL + '/fooditems/show',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
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

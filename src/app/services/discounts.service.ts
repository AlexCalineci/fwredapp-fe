import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {Discounts} from "../model/Discounts";
import {AuthService} from "./auth.service";



@Injectable({
  providedIn: 'root',
})
export class DiscountsService {
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

  addNewdiscount(discount: Discounts): Observable<Discounts> {
    let JsonInput = {
      discountPercentage: discount.discountPercentage,
      startDate: discount.startDate,
      endDate: discount.endDate,
      orgId: discount.orgId,
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Discounts>(
        environment.BASE_URL + '/discount/add',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  editDiscount(discount: Discounts): Observable<Discounts> {
    let JsonInput = {
      discountPercentage: discount.discountPercentage,
      startDate: discount.startDate,
      endDate: discount.endDate,
      orgId: discount.orgId,
      discountId: discount.discountId
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Discounts>(
        environment.BASE_URL + '/discount/edit',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  loadDiscounts(orgId: number | undefined): Observable<Discounts[]> {
    let JsonInput = {
      orgId: orgId,
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Discounts[]>(
        environment.BASE_URL + '/discount/show',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  deleteDiscounts(discountId:number|null): Observable<Discounts[]> {
    let JsonInput = {
      discountId: discountId,
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Discounts[]>(
        environment.BASE_URL + '/discount/delete',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }
}

import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {FeedbackRating} from "../model/FeedbackRating";



@Injectable({
  providedIn: 'root',
})
export class FeedbackRatingsService {
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

  addFeedback(feedback: FeedbackRating): Observable<FeedbackRating> {
    let JsonInput = {
      raterOrgId:feedback.raterOrgId,
      ratedOrgId:feedback.ratedOrgId,
      starRating:feedback.starRating,
      reservationId:feedback.reservationId
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<FeedbackRating>(
        environment.BASE_URL + '/feedback/add',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  loadFeedback(orgId:number|undefined,orgType:string|undefined):Observable<FeedbackRating[]>{
    let JsonInput = {
      orgId:orgId,
      orgType:orgType
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<FeedbackRating[]>(
        environment.BASE_URL + '/feedback/show',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

}

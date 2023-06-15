import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {DashboardStats} from "../model/DashboardStats";
import {FoodItems} from "../model/FoodItems";
import {Organizations} from "../model/Organization";



@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
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

  geOrganizations(orgType:string|undefined):Observable<Organizations[]>{
    return this.http.get<Organizations[]>( `${environment.BASE_URL + '/organizations/show'}/${orgType}`);
  }

}

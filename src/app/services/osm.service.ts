import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
// @ts-ignore
import {GeolocationService} from '@ng-web-apis/geolocation';
import {catchError, Observable, throwError} from "rxjs";
import {Osm} from "../model/Osm";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
@Injectable()
export class OsmService{

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

  constructor(private http: HttpClient,private geolocationService: GeolocationService,private authService:AuthService) {
  }


  getDefaultPosition():Observable<GeolocationPosition> {
      return this.geolocationService.pipe();
  };

  getDeliveryPoints(orgId: number | null|undefined): Observable<Osm[]> {
    let JsonInput = {
      orgId: orgId
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Osm[]>(
        environment.BASE_URL + '/deliverypoints/show',
        body,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }
}

export interface GeoLocationDetails{
  latitude:number;
  longitude:number;
  orgName:string;
  deliveryPointAlias:string;
}

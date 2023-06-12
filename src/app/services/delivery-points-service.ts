import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {UserType} from "../model/UserType";
import {environment} from "../../environments/environment";
import {Registration} from "../model/Registration";
import {Users} from "../model/Users";
import {AuthService} from "./auth.service";
import {Countries} from "../model/Countries";
import {Regions} from "../model/Regions";
import {Cities} from "../model/Cities";
import {Address} from "../model/Address";
import {DeliveryPoint} from "../model/DeliveryPoints";


@Injectable({
  providedIn: 'root',
})
export class DeliveryPointsService {

  private getHttpOptions(): { headers: HttpHeaders } {
    const authToken = this.authService.getAuthToken();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken ? `Bearer ${authToken}` : '',
      }),
    };
  }
  constructor(private http: HttpClient,private authService:AuthService) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error(JSON.stringify(error.error)));
  }

  getCountries():Observable<Countries[]>{
    return this.http.get<Countries[]>(environment.BASE_URL + '/deliverypoints/countries');
  }

  getRegions(countryId:number|null|undefined):Observable<Regions[]>{
    return this.http.get<Regions[]>( `${environment.BASE_URL + '/deliverypoints/regions'}/${countryId}`);
  }

  getCities(regionId:number|null|undefined):Observable<Cities[]>{
    return this.http.get<Cities[]>( `${environment.BASE_URL + '/deliverypoints/cities'}/${regionId}`);
  }

  saveDeliveryPoint(address:Address):Observable<Address>{
    let JsonInput = {
      addressDetails:address.addressDetails,
      zipcode:address.zipcode,
      street:address.street,
      streetNumber:address.streetNumber,
      cityId:address.cityId,
      latitude:address.latitude,
      longitude:address.longitude,
      deliveryPointAlias:address.deliveryPointAlias,
      orgId:address.orgId
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Address>(environment.BASE_URL + '/deliverypoints/save', body,this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  getDeliveryPointByOrgId(orgId:number|null|undefined):Observable<DeliveryPoint[]>{
      return this.http.get<DeliveryPoint[]>( `${environment.BASE_URL + '/deliverypoints/show'}/${orgId}`)
      .pipe(catchError(this.handleError));

  }

}

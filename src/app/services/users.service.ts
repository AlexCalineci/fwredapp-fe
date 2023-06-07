import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, pipe, throwError} from "rxjs";
import {UserType} from "../model/UserType";
import {environment} from "../../environments/environment";
import {Registration} from "../model/Registration";
import {Users} from "../model/Users";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {


  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error(JSON.stringify(error.error)));
  }

  getUserTypes():Observable<UserType[]>{
    return this.http.get<UserType[]>(environment.BASE_URL + '/users/usertype');
  }

  registerUserAndOrganization(userRegistration:Registration):Observable<Registration>{
    let JsonInput = {
      userName: userRegistration.userName,
      userTypeId:userRegistration.userTypeId,
      email:userRegistration.email,
      connectionSecureString:userRegistration.connectionSecureString,
      organizationName:userRegistration.organizationName,
      description:userRegistration.description,
      contactPerson:userRegistration.contactPerson,
      contactEmail:userRegistration.contactEmail,
      contactPhone:userRegistration.contactPhone,
      legalDetails:userRegistration.legalDetails,
      fic:userRegistration.fic
    };
    const body = JSON.stringify(JsonInput);
    return this.http
      .post<Registration>(environment.BASE_URL + '/users/registration', body,httpOptions)
      .pipe(catchError(this.handleError));

  }

  authenticateUser(user:String,password:String):Observable<Users>{
    let JsonInput = {
      username: user,
      password: password
    }
    const body = JSON.stringify(JsonInput);
    return this.http.post<Users>(environment.BASE_URL + '/auth/login', body,httpOptions).pipe(catchError(this.handleError));
  }


}

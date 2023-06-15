import { Injectable } from '@angular/core';
import { UsersFacade } from './users.facade';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: string | undefined = '';

  constructor(private userFacade: UsersFacade) {}

  public setToken(token: string|undefined): void {
    this.authToken = token;
  }

  getAuthToken(): string | undefined {
    this.userFacade.authenticatedUser$
      .pipe(
        tap((user) => {
          console.log(user);
          this.authToken = user?.token;
        })
      )
      .subscribe(user => this.setToken(user?.token));
    return this.authToken;
  }
}

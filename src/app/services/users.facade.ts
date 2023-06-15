import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserType } from '../model/UserType';
import { UsersService } from './users.service';
import { Registration } from '../model/Registration';
import { Users } from '../model/Users';

export interface UserState {
  userType: UserType[];
  authenticatedUser: Users | null;
  isAuthenticated:boolean,
  token:string
}

const initialState: UserState = {
  userType: [],
  authenticatedUser: null,
  isAuthenticated:false,
  token:''
};

@Injectable()
export class UsersFacade {
  private localStore = new BehaviorSubject<UserState>(initialState);
  private localState$ = this.localStore.asObservable();

  userType$ = this.localState$.pipe(
    map((state) => state.userType),
    distinctUntilChanged()
  );

  isAuthenticated$ = this.localState$.pipe(
    map((state) => state.isAuthenticated),
    distinctUntilChanged()
  );

  authenticatedUser$ = this.localState$.pipe(
    map((state) => state.authenticatedUser),
    distinctUntilChanged()
  );

  token$ = this.localState$.pipe(
    map((state) => state.token),
    distinctUntilChanged()
  );

  constructor(private userService: UsersService) {
    this.getUserType().subscribe();
  }

  setUserType(userType: UserType[]): void {
    const state = { ...this.localStore.value, userType };
    this.localStore.next(state);
  }

  setToken(token: string): void {
    const state = { ...this.localStore.value, token };
    this.localStore.next(state);
  }

  setAuthenticatedUser(authenticatedUser: Users): void {
    const state = {
      ...this.localStore.value,
      authenticatedUser,
      isAuthenticated: true
    };

    this.localStore.next(state);
  }

  setIsAuthenticated(isAuthenticated: boolean): void {
    const state = {
      ...this.localStore.value,
      isAuthenticated
    };
    this.localStore.next(state);
  }

  getUserType(): Observable<UserType[]> {
    return this.userService.getUserTypes().pipe(
      map((userTypes: any[]) =>
        userTypes.map((userType: any) => ({
          userType: userType.userType,
          userTypeId: userType.userTypeId,
        }))
      ),
      tap((userTypeArray: UserType[]) => {
        this.setUserType(userTypeArray);
      })
    );
  }

  saveRegistrationDetails(registrationDetails: Registration): Observable<Registration> {
    return this.userService.registerUserAndOrganization(registrationDetails);
  }

  authenticateUser(user: string, password: string): Observable<Users> {
    return this.userService.authenticateUser(user, password).pipe(
      tap((users: Users) => {
        this.setAuthenticatedUser(users);
        this.setToken(users.token);
      })
    );

  }

}

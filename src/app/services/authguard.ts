import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersFacade } from './users.facade';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersFacade: UsersFacade, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.usersFacade.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }
}

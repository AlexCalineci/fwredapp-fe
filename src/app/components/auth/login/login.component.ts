import { Component } from '@angular/core';
import { LayoutService } from 'src/app/components/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { UsersFacade } from '../../../services/users.facade';
import { of, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import {Users} from "../../../model/Users";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  username!: string;
  password!: string;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private usersFacade: UsersFacade,
    private messageService: MessageService
  ) {}

  signIn() {
    this.usersFacade.authenticateUser(this.username, this.password).subscribe({
      next: (users: Users) => {
        this.usersFacade.setAuthenticatedUser(users);
        this.usersFacade.setIsAuthenticated(true); // Set isAuthenticated to true
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        // Authentication failed
        this.usersFacade.setIsAuthenticated(false);
        this.messageService.add({
          key: 'errorMessage',
          severity: 'error',
          summary: 'Login failed!',
          detail: 'Authentication is not possible due to invalid credentials',
        });
      },
    });
  }


}

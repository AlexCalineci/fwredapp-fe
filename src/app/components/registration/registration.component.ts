import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { LayoutService } from '../layout/service/app.layout.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UserType } from '../../model/UserType';
import { UsersFacade, UserState } from '../../services/users.facade';
import { map, Observable, tap } from 'rxjs';
import { Registration } from '../../model/Registration';
import {MessageService} from "primeng/api";

@Component({
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  @ViewChild('submitButton', { static: false }) submitButtonRef!: ElementRef;

  userTypeDropdown: UserType[] = [];
  registrationInput: Registration = <Registration>{};
  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private userFacade: UsersFacade,
    private messageService: MessageService
  ) {
    this.userFacade.getUserType().subscribe((userTypeArray: UserType[]) => {
      this.userTypeDropdown = userTypeArray;
    });
  }
  selectedScope: UserType | null = null;
  ngOnInit() {

  }

  isFormValid(): boolean {
    return (
      !!this.registrationInput.userName &&
      !!this.registrationInput.email &&
      !!this.registrationInput.organizationName &&
      !!this.registrationInput.fic &&
      !!this.registrationInput.connectionSecureString &&
      !!this.registrationInput.contactPerson &&
      !!this.registrationInput.contactEmail
    );
  }

  saveRegistrationDetails(registrationDetails: Registration): void {
    this.submitButtonRef.nativeElement.disabled = true;
    registrationDetails.userTypeId = this.selectedScope?.userTypeId;
    this.userFacade.saveRegistrationDetails(registrationDetails).subscribe({
      complete: () => {
        this.messageService.add({
          key: 'successMessage',
          severity: 'success',
          summary: 'Registration Saved',
          detail: 'Your registration details have been saved successfully!',
        });

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);

      },error:()=>{
        this.messageService.add({
          key: 'errorMessage',
          severity: 'error',
          summary: 'Registration failed',
          detail: 'Your registration failed!',
        });
      }
    });
  }
}

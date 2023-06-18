import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UsersFacade } from '../../services/users.facade';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  userRoles: Array<string> | undefined = [];
  constructor(
    public layoutService: LayoutService,
    private userFacade: UsersFacade
  ) {}

  ngOnInit() {
    this.userFacade.authenticatedUser$.subscribe(
      (user) => (this.userRoles = user?.roles)
    );

    this.model = [
      {
        label: 'Home',
        visible: this.hasRole('RECEIVER') || this.hasRole('DONOR'),
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard'],
            visible: this.hasRole('RECEIVER') || this.hasRole('DONOR'),
          },
        ],
      },
      {
        label: 'Action Menu',
        visible: this.hasRole('RECEIVER') || this.hasRole('DONOR'),
        items: [
          {
            label: 'Discounts',
            icon: 'pi pi-fw pi-credit-card',
            routerLink: ['/discounts'],
            visible: this.hasRole('DONOR'),
          },
          {
            label: 'Delivery points',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: ['/delivery-points'],
            visible: this.hasRole('DONOR'),
          },
          {
            label: 'Food Items',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/food-items'],
            visible: this.hasRole('DONOR') || this.hasRole('RECEIVER'),
          },
          {
            label: 'Donation Map',
            icon: 'pi pi-fw pi-map-marker',
            routerLink: ['/donation-map'],
            visible: this.hasRole('RECEIVER'),
          },
          {
            label: 'Reservations',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: ['/reservations'],
            visible: this.hasRole('RECEIVER')|| this.hasRole('DONOR'),
          },
          {
            label: 'Feedback ratings',
            icon: 'pi pi-fw pi-star',
            routerLink: ['/feedback-ratings'],
            visible: this.hasRole('DONOR') || this.hasRole('RECEIVER'),
          }
        ],
      },

      {
        label: 'Admin Panel',
        visible: this.hasRole('ADMIN'),
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Authorize Organisations',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/admin'],
            visible: this.hasRole('ADMIN'),
          },
        ],
      },
    ];
  }

  private hasRole(role: string): boolean {
    // @ts-ignore
    return this.userRoles.includes(role);
  }
}

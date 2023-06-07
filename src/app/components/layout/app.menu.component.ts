import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Action Menu',
                items: [
                    { label: 'Discounts', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/discounts'] },
                    { label: 'Delivery points', icon: 'pi pi-fw pi-check-square', routerLink: ['/delivery-points'] },
                    { label: 'Food Items', icon: 'pi pi-fw pi-id-card', routerLink: ['/food-items'] },
                    { label: 'Donation Map', icon: 'pi pi-fw pi-check-square', routerLink: ['/donation-map'] },
                    { label: 'Reservations', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/reservations'] }
                ]
            },

            {
                label: 'Admin Panel',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Authorize Organisations',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                ]
            }
        ];
    }
}

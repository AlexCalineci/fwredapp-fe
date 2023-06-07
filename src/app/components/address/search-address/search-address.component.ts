import {Component, OnInit} from '@angular/core';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-search',
  template: `
    <input type="text" [(ngModel)]="address">
    <button (click)="search()">Search</button>
    <div *ngIf="coordinates">
      Latitude: {{ coordinates.latitude }}<br>
      Longitude: {{ coordinates.longitude }}
    </div>
  `
})
export class SearchAddressComponent {
  address: string = '';
  coordinates: { latitude: number; longitude: number } | null = null;

  constructor(private nominatimService: AddressService) {}

  search() {
    this.nominatimService.getAddressCoordinates(this.address)
      .subscribe(coords => {
        this.coordinates = coords;
      });
  }

}

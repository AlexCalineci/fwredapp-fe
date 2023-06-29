import {Component, OnInit} from '@angular/core';
import * as Leaf from 'leaflet';
import 'leaflet-routing-machine';
import { Osm } from '../../model/Osm';
import { OsmFacade } from '../../services/osm.facade';
import { OsmService } from '../../services/osm.service';
import { take } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersFacade } from '../../services/users.facade';
export const TITLE = '<a href="#/food-items">Your current location</a>';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-osm',
  templateUrl: './osm.component.html',
  styleUrls: ['./osm.components.scss'],
})
export class OsmComponent implements OnInit {

  private map: any;

  geolocation: Osm[] = [];
  orgId: number | null = 0;

  title: string = TITLE;
  constructor(
    private osmFacade: OsmFacade,
    private osmService: OsmService,
    private userFacade: UsersFacade
  ) {}

  ngOnInit(): void {
    this.userFacade.authenticatedUser$
      .pipe(
        tap((user) => {
          if (user?.roles.includes('DONOR')) {
            this.orgId = user.orgId;
          } else {
            this.orgId = null;
          }
        })
      )
      .subscribe();
    this.osmService
      .getDeliveryPoints(this.orgId)
      .pipe()
      .subscribe((locationDetails) => {
        this.geolocation = locationDetails;
        this.osmService
          .getDefaultPosition()
          .pipe(take(1))
          .subscribe((position) => {
            let _geolocation: Osm = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              orgId: 0,
              deliveryPointAlias: '',
              title: this.title,
            };
            this.geolocation.push(_geolocation);
          });
        this.initMap(this.geolocation);
      });
  }

  private initMap(geolocation: Osm[]): void {
    if (geolocation.length > 0) {
      this.map = Leaf.map('map', {
        center: [geolocation[0].latitude, geolocation[0].longitude],
        attributionControl: false,
        zoom: 14,
      });

      var iconDefault = Leaf.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });

      Leaf.Marker.prototype.options.icon = iconDefault;

      const tiles = Leaf.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
        }
      );
      for (let index = 0; index < geolocation.length; index++) {
        const marker = Leaf.marker([
          geolocation[index].latitude,
          geolocation[index].longitude,
        ]).bindPopup(geolocation[index].title);
        marker.addTo(this.map);
        tiles.addTo(this.map);
      }
    }
  }
}

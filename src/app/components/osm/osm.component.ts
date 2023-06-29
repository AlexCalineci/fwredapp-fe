import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as Leaf from 'leaflet';
import 'leaflet-routing-machine';
import { Osm } from '../../model/Osm';
import { OsmService } from '../../services/osm.service';
import {switchMap, take } from 'rxjs';
import { UsersFacade } from '../../services/users.facade';
import { OsmFacade } from '../../services/osm.facade';

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
  private map: Leaf.Map | undefined;
  private markers: Leaf.Marker[] = [];
  private tiles: Leaf.TileLayer | undefined;
  @Input() isMapInitialized: boolean | null = false;

  geolocation: Osm[] = [];
  orgId: number | null = 0;

  title: string = TITLE;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  constructor(
    private osmService: OsmService,
    private userFacade: UsersFacade,
    private osmFacade: OsmFacade,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {

  }

  initializeMap(orgId: number | null | undefined) {

    this.osmService
      .getDeliveryPoints(orgId)
      .pipe(
        switchMap((locationDetails) => {
          this.geolocation = locationDetails;
          return this.osmService.getDefaultPosition().pipe(take(1));
        })
      )
      .subscribe((position) => {
        let _geolocation: Osm = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          orgId: 0,
          deliveryPointAlias: '',
          title: this.title,
        };
        this.geolocation.push(_geolocation);

        this.initMap(this.geolocation);
      });
  }

  public updateMarkers(orgId: number | null | undefined, map: Leaf.Map) {
    if (map !== undefined) {
      this.markers.forEach((marker) => {
        marker.remove();
        map.removeLayer(marker);
      });
      this.markers = [];
      this.osmService.getDeliveryPoints(orgId).subscribe((locationDetails) => {
        this.geolocation = locationDetails;
        this.geolocation.forEach((location) => {
          const marker = Leaf.marker([
            location.latitude,
            location.longitude,
          ]).bindPopup(location.title);
          marker.addTo(map);
          this.markers.push(marker);
        });
      });
      this.osmFacade.setMap(map);
    }
  }

  private destroyMap(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
      const mapElement = this.elementRef.nativeElement.querySelector('#map');
      mapElement.innerHTML = '';
    }
  }


  private initMap(geolocation: Osm[]): void {
    this.destroyMap();
      this.map = Leaf.map('map', {
        center: [geolocation[0].latitude, geolocation[0].longitude],
        attributionControl: false,
        zoom: 14,
      });

    if (geolocation.length > 0) {
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

      this.tiles = Leaf.tileLayer(
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
        this.markers.push(marker);
        this.tiles.addTo(this.map);
      }
    }
    this.osmFacade.setIsMapInitialized(true);
    this.osmFacade.setMap(this.map);
  }
}

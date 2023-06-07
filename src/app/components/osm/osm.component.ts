import {Component, Input, OnInit} from '@angular/core';
import * as Leaf from 'leaflet';
import  'leaflet-routing-machine';
import {OsmModel} from "./osm.model";
import {OsmFacade} from "./osm.facade";
import {OsmService} from "./osm.service";
import {take} from "rxjs";
export const TITLE = 'Your current position';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-osm',
  templateUrl: './osm.component.html',
  styleUrls: ['./osm.components.scss']
})
export class OsmComponent  implements OnInit {
  private map:any;

  geolocation: OsmModel[]=[];

  title: string = TITLE ;
  constructor(private osmFacade:OsmFacade,private osmService: OsmService) {

  }

  ngOnInit(): void {
   this.osmService.getDefaultPosition().pipe(take(1)).subscribe((position)=>{
      let _geolocation:OsmModel={
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      }
      this.geolocation.push(_geolocation);
      this.initMap(this.geolocation);
   });

  }

  private initMap(geolocation:OsmModel[]): void {
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
        shadowSize: [41, 41]
      });

      Leaf.Marker.prototype.options.icon = iconDefault;

      const tiles = Leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      });
      for (let index = 0; index < geolocation.length; index++) {
        const marker = Leaf.marker([geolocation[index].latitude, geolocation[index].longitude]).bindPopup(this.title);
        marker.addTo(this.map);

        Leaf.Routing.control({
          router: Leaf.Routing.osrmv1({
            serviceUrl: `https://router.project-osrm.org/route/v1/`
          }),
          showAlternatives: true,
          fitSelectedRoutes: false,
          show: false,
          routeWhileDragging: true
        }).addTo(this.map);
        tiles.addTo(this.map);
      }

    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// @ts-ignore
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Observable, skip, take, tap} from "rxjs";
import {map} from "rxjs/operators";
import {OsmModel} from "./osm.model";
@Injectable()
export class OsmService{

  constructor(private http: HttpClient,private geolocationService: GeolocationService) {
  }


  ipAddress = '';

  getDefaultPosition():Observable<GeolocationPosition> {
      return this.geolocationService.pipe();
  };

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }
}

export interface GeoLocationDetails{
  latitude:number;
  longitude:number
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = 'https://nominatim.openstreetmap.org/';

  constructor(private http: HttpClient) {}

  getAddressCoordinates(address: string): Observable<{ latitude: number, longitude: number } | null> {
    const url = `${this.baseUrl}search?format=json&q=${encodeURIComponent(address)}`;

    return this.http.get<any[]>(url).pipe(
      map(results => {
        if (results.length > 0) {
          const { lat, lon } = results[0];
          return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        }
        return null;
      })
    );
  }
}

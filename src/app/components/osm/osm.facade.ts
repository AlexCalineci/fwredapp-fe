import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, skip, tap} from 'rxjs';
import {OsmModel} from "./osm.model";
import {OsmService} from "./osm.service";
export interface GeoLocationState {
  geolocation: OsmModel[]
}
let _state: GeoLocationState = {
  geolocation: []
};
@Injectable()
export class OsmFacade {
  private localStore = new BehaviorSubject<GeoLocationState>(_state);
  private localState$ = this.localStore.asObservable();

  geolocation$ = this.localState$.pipe(
    map((state) => state.geolocation),
    distinctUntilChanged()
  );
  constructor(private osmService: OsmService) {
    this.loadGeolocation().pipe().subscribe();
  }
  setGeolocation(geolocation: OsmModel[]): void {
    this.updateState({ geolocation });
  }

  private updateState(state: GeoLocationState): void {
    this.localStore.next(state);
  }

  loadGeolocation(): Observable<void> {
    return this.osmService.getDefaultPosition().pipe(
      tap((position) => {
        const geoLocationArray: OsmModel[] = [
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        ];
        this.setGeolocation(geoLocationArray);
      }),
      map(() => {})
    );
  }

}

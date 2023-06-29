import {Injectable} from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map} from 'rxjs';
import {OsmService} from "./osm.service";
import * as Leaf from 'leaflet';

export interface OsmState {
  isMapInitialized: boolean|null;
  map: Leaf.Map|undefined;
}
let _state: OsmState = {
  isMapInitialized: false,
  map: undefined
};
@Injectable()
export class OsmFacade {
  private localStore = new BehaviorSubject<OsmState>(_state);
  private localState$ = this.localStore.asObservable();

  isMapInitialized$ = this.localState$.pipe(
    map((state) => state.isMapInitialized),
    distinctUntilChanged()
  );

  map$ = this.localState$.pipe(
    map((state) => state.map),
    distinctUntilChanged()
  );
  constructor(private osmService: OsmService) {
  }

  public setIsMapInitialized(isMapInitialized: boolean): void {
    this.updateState({..._state,isMapInitialized });
  }

  public setMap(map: Leaf.Map|undefined): void {
    this.updateState({..._state,map });
  }

  private updateState(state: OsmState): void {
    this.localStore.next(state);
  }

}

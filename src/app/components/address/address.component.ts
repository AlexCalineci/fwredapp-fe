import { Component, OnInit } from '@angular/core';
import { Cities } from '../../model/Cities';
import { Regions } from '../../model/Regions';
import { Countries } from '../../model/Countries';
import { UsersFacade } from '../../services/users.facade';
import { MessageService } from 'primeng/api';
import { DeliveryPointsService } from '../../services/delivery-points-service';
import { switchMap } from 'rxjs';
import { Address } from '../../model/Address';
import { map, tap } from 'rxjs/operators';
import { AddressService } from './address.service';
import {OsmService} from "../../services/osm.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['address.component.scss'],
})
export class AddressComponent implements OnInit {
  cities: Cities[] = [];
  regions: Regions[] = [];
  countries: Countries[] = [];
  addressInput: Address = <Address>{};

  constructor(
    private userFacade: UsersFacade,
    private messageService: MessageService,
    private deliveryPointService: DeliveryPointsService,
    private addressService: AddressService,
    private osmService:OsmService
  ) {}
  selectedScopeCity: Cities | null = null;
  selectedScopeRegion: Regions | null = null;
  selectedScopeCountry: Countries | null = null;

  ngOnInit() {
    this.userFacade.authenticatedUser$
      .pipe(
        tap((user) => {
          this.addressInput.orgId = user?.orgId;
        })
      )
      .subscribe();

    this.deliveryPointService
      .getCountries()
      .pipe(
        switchMap((countries) => {
          this.countries = countries;
          return this.deliveryPointService
            .getRegions(countries[0].countryId)
            .pipe(
              switchMap((regions) => {
                this.regions = regions;
                return this.deliveryPointService.getCities(regions[0].regionId);
              })
            );
        })
      )
      .subscribe((cities) => {
        this.cities = cities;
      });
  }

  onCountryChange(event: any) {
    const selectedCountry = event.value;
    if (selectedCountry) {
      this.deliveryPointService
        .getRegions(selectedCountry.countryId)
        .subscribe((regions) => (this.regions = regions));
    } else {
      this.regions = [];
    }
  }

  onRegionChange(event: any) {
    const selectedRegion = event.value;
    if (selectedRegion) {
      this.deliveryPointService
        .getCities(selectedRegion.regionId)
        .subscribe((cities) => {
          this.cities = cities;
        });
    } else {
      this.cities = [];
    }
  }

  registerDeliveryPoint(addressInput: Address) {
    addressInput.addressDetails =
      this.selectedScopeRegion?.regionName +
      ',' +
      this.selectedScopeCity?.cityName +
      ',' +
      addressInput.street +
      ',' +
      addressInput.streetNumber;

    addressInput.cityId = this.selectedScopeCity?.cityId;
    this.addressService
      .getAddressCoordinates(addressInput.addressDetails)
      .subscribe({next:(coords)=>{
          addressInput.longitude = coords?.longitude;
          addressInput.latitude = coords?.latitude;
        },complete:()=>{
          this.deliveryPointService.saveDeliveryPoint(addressInput).subscribe({
            complete: () => {
              this.messageService.add({
                key: 'successMessage',
                severity: 'success',
                summary: 'Address was Saved',
                detail: 'Your delivey point has been saved successfully!',
              });
              setTimeout(() => {}, 2000);
            },
            error: () => {
              this.messageService.add({
                key: 'errorMessage',
                severity: 'error',
                summary: 'Address registration failed',
                detail: 'Address registration failed!',
              });
            },
          });
        },error:()=>{
          this.messageService.add({
            key: 'errorMessage',
            severity: 'error',
            summary: 'Coordinates could not be calculated!',
            detail: 'Recheck the address input as the coordinates could not be identified',
          });
        }
      });
  }
}

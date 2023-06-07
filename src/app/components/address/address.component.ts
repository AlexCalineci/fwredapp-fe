import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls:['address.component.scss']
})
export class AddressComponent {

  selectedScope: any = null;

  usertype: any[] = [
    {name: 'DONOR', code: '1'},
    {name: 'RECEIVER', value: '2'}
  ];

  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];

  cities1: any[] = [];

  cities2: any[] = [];

  city1: any = null;

  city2: any = null;

}

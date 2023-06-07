import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SearchAddressComponent} from "./search-address/search-address.component";

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SearchAddressComponent }
	])],
	exports: [RouterModule]
})
export class AddressRoutingModule { }

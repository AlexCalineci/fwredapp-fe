export interface Address{
  addressId:	number;
  addressDetails:string;
  latitude:number|undefined;
  longitude:number|undefined;
  active:string;
  street:string
  zipcode:string;
  streetNumber:string;
  cityId:number|undefined;
  deliveryPointId:number;
  orgId:number|null|undefined;
  deliveryPointAlias:string;
}

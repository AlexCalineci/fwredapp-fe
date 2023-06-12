export interface FoodItems{
  discountId?:number;
  quantityType:string;
  active:string;
  name:string;
  availableQuantity:number;
  deliveryPointId?:number;
  deliveryPointAlias:string;
  organizationName:string;
  expirationDate:string;
  orgId:number|undefined;
  listPrice:number;
  foodItemId:number;
  description:string;
  discountPercentage:number;
}


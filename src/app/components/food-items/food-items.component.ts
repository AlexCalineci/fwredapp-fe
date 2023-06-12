import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UsersFacade } from '../../services/users.facade';
import { FoodItems } from '../../model/FoodItems';
import { Discounts } from '../../model/Discounts';
import { tap } from 'rxjs/operators';
import { FoodItemsService } from '../../services/food-items.service';
import {DeliveryPoint} from "../../model/DeliveryPoints";
import {DiscountsService} from "../../services/discounts.service";
import {DeliveryPointsService} from "../../services/delivery-points-service";
import {Cities} from "../../model/Cities";
import {Regions} from "../../model/Regions";
import {Countries} from "../../model/Countries";

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  templateUrl: './food-items.component.html',
  providers: [MessageService, ConfirmationService],
})
export class FoodItemsComponent implements OnInit {
  foodItemInput: FoodItems = <FoodItems>{};
  foodItemList: FoodItems[] = [];
  loading: boolean = false;

  orgId: number | undefined = 0;

  editingFoodItem: FoodItems | null = null;
  clearAndAddVisible = false;

  selectedfoodItem: FoodItems = <FoodItems>{};

  discountsOptionList: Discounts[] = [];
  deliveryPointsList:DeliveryPoint[] = [];

  @ViewChild('filter') filter!: ElementRef;

  userRoles: Array<string> | undefined = [];

  quantityTypeOption: string[] = ['KG', 'L', 'PIECE'];


  selectedScopeDiscounts: Discounts | null = null;
  selectedScopeDeliveryPoints: DeliveryPoint | null = null;
  selectedQuantityType: string = '';

  editingItem: boolean = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userFacade: UsersFacade,
    private foodItemService: FoodItemsService,
    private discountService:DiscountsService,
    private deliveryPointService:DeliveryPointsService
  ) {}

  loadFoodItemList(orgId: number | undefined): void {
    this.loading = true;
    this.foodItemService.loadFoodItems(this.orgId).subscribe({
      next: (foodItems) => {
        this.foodItemList = foodItems;
        console.log(this.foodItemList);
        this.loading = false;
      },
    });
  }

  ngOnInit() {
    this.userFacade.authenticatedUser$
      .pipe(
        tap((user) => {
          this.orgId = user?.orgId;
          this.userRoles = user?.roles;
        })
      )
      .subscribe();
     this.foodItemService.loadFoodItems(this.orgId);

     this.discountService.loadDiscounts(this.orgId).subscribe(discounts => {
          this.discountsOptionList = discounts;
     });

     this.deliveryPointService.getDeliveryPointByOrgId(this.orgId).subscribe(deliveryPoints => {
        this.deliveryPointsList = deliveryPoints;
     });
  }

  private formatDate(date: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }

  submitFoodItem(foodItem: FoodItems): void {
    foodItem.orgId = this.orgId;
    foodItem.deliveryPointId = this.selectedScopeDeliveryPoints?.deliveryPointId;
    foodItem.discountId = this.selectedScopeDiscounts?.discountId;
    foodItem.quantityType = this.selectedQuantityType;
    if (this.editingFoodItem) {
      this.editingFoodItem.discountId = foodItem.discountId;
      this.editingFoodItem.expirationDate = foodItem.expirationDate;
      this.editingFoodItem.description = foodItem.description;
      this.editingFoodItem.listPrice = foodItem.listPrice;
      this.editingFoodItem.description = foodItem.description;
      this.editingFoodItem.availableQuantity = foodItem.availableQuantity;
      this.editingFoodItem.quantityType = foodItem.quantityType;
      this.editingFoodItem.deliveryPointId = foodItem.deliveryPointId;

      this.foodItemService.editFoodItem(this.editingFoodItem).subscribe({
        complete: () => {
          this.messageService.add({
            key: 'successMessage',
            severity: 'success',
            summary: 'Food item updated',
            detail: 'Food item entry was updated!',
          });

          setTimeout(() => 2000);
          this.loadFoodItemList(this.orgId);
          this.editingFoodItem = null;
          this.clearAndAddVisible = false;
          this.clearAndAddFoodItem();
        },
        error: () => {
          this.messageService.add({
            key: 'errorMessage',
            severity: 'error',
            summary: 'Food item update failed!',
            detail: 'Food item entry was not updated!',
          });
        },
      });
    } else {
      this.foodItemService.addNewFoodItem(foodItem).subscribe({
        complete: () => {
          this.messageService.add({
            key: 'successMessage',
            severity: 'success',
            summary: 'Food item Saved',
            detail: 'Food item entry was saved!',
          });

          setTimeout(() => 2000);
          this.loadFoodItemList(this.orgId);
        },
        error: () => {
          this.messageService.add({
            key: 'errorMessage',
            severity: 'error',
            summary: 'Food item save failed!',
            detail: 'Food item entry was not saved!',
          });
        },
      });
    }
  }

  formatCurrency(value: number) {
    return value.toLocaleString('ro-RO', {
      style: 'currency',
      currency: 'RON',
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  public hasRole(role: string): boolean {
    // @ts-ignore
    return this.userRoles.includes(role);
  }

  clearAndAddFoodItem() {
    this.foodItemInput = <FoodItems>{};
    this.editingFoodItem = null;
    this.clearAndAddVisible = false;
  }
}

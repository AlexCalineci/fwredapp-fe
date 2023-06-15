import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import {Router} from "@angular/router";
import {ReservationsService} from "../../services/reservations.service";

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  templateUrl: './food-items.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls:['./food-items.component.scss']
})
export class FoodItemsComponent implements OnInit {
  foodItemInput: FoodItems = <FoodItems>{};
  foodItemList: FoodItems[] = [];
  loading: boolean = false;
  foodItemReservation: any = {};
  showReservationModal: boolean = false;

  orgId: number | undefined = 0;

  editingFoodItem: FoodItems | null = null;
  clearAndAddVisible = false;
  editingItem: boolean = false;

  selectedfoodItem: FoodItems = <FoodItems>{};

  discountsOptionList: Discounts[] = [];
  deliveryPointsList:DeliveryPoint[] = [];

  @ViewChild('filter') filter!: ElementRef;

  userRoles: Array<string> | undefined = [];

  quantityTypeOption: string[] = ['KG', 'L', 'PIECE'];


  selectedScopeDiscounts: Discounts | null = null;
  selectedScopeDeliveryPoints: DeliveryPoint | null = null;
  selectedQuantityType: string = '';
  private currentRole: string | undefined;


  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userFacade: UsersFacade,
    private foodItemService: FoodItemsService,
    private discountService:DiscountsService,
    private deliveryPointService:DeliveryPointsService,
    private router:Router,
    private reservationService:ReservationsService
  ) {}

  loadFoodItemList(orgId: number | undefined,userType:string|undefined): void {
    this.loading = true;
    this.foodItemService.loadFoodItems(orgId,userType).subscribe({
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
          this.currentRole = user?.roles[0];
        })
      )
      .subscribe();
     this.loadFoodItemList(this.orgId,this.currentRole);

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

  editFoodItem(foodItem: FoodItems) {
    this.editingFoodItem = { ...foodItem };
    this.foodItemInput = {
      ...foodItem
    };
    this.clearAndAddVisible = true;
    this.editingItem = true;
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
          this.loadFoodItemList(this.orgId,this.currentRole);
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
          this.loadFoodItemList(this.orgId,this.currentRole);
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

  confirmDeleteFoodItem(foodItem: FoodItems) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this discount?',
      accept: () => {
        this.foodItemService.deleteFoodItems(foodItem.foodItemId).subscribe({
          complete: () => {
            this.messageService.add({
              key: 'successMessage',
              severity: 'success',
              summary: 'Food item removed',
              detail: 'Food item entry was removed!',
            });

            setTimeout(() => 2000);
            this.loadFoodItemList(this.orgId,this.currentRole);
          },
          error: () => {
            this.messageService.add({
              key: 'errorMessage',
              severity: 'error',
              summary: 'Food item remove failed!',
              detail: 'Food item entry was not removed!',
            });
          },
        });
      },
      reject: () => {
        // Do nothing if deletion is canceled
      },
    });
  }

  clearAndAddFoodItem() {
    this.foodItemInput = <FoodItems>{};
    this.editingFoodItem = null;
    this.editingItem = false;
    this.clearAndAddVisible = false;
  }

  openReservationModal(foodItem: FoodItems) {
    console.log("Food items",foodItem);
    this.foodItemReservation = {
      name: foodItem.name,
      foodItemId:foodItem.foodItemId,
      currentAvailableQuantity: foodItem.availableQuantity,
      quantity:null,
      donorOrgId:foodItem.orgId,
      receiverOrgId:this.orgId,
      listPrice:foodItem.listPrice,
      discountPercentage:foodItem.discountPercentage
    };
    console.log("Food items reservations",this.foodItemReservation);
    this.showReservationModal = true;
  }

  makeReservation(foodItemReservation:any) {
    this.reservationService.addReservation(foodItemReservation).subscribe({complete:()=>{
        console.log("Submited food item",foodItemReservation)
        this.showReservationModal = false;
        this.router.navigate(['/reservations']);
      },
      error: () => {
        this.messageService.add({
          key: 'errorMessage',
          severity: 'error',
          summary: 'Reservation failed!',
          detail: 'Food item reservation failed!',
        });
      },});

  }

  cancelReservation() {
    this.foodItemReservation = {};

    this.showReservationModal = false;
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Discounts } from '../../model/Discounts';
import { UsersFacade } from '../../services/users.facade';
import { DiscountsService } from '../../services/discounts.service';
import { tap } from 'rxjs/operators';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  templateUrl: './discounts.component.html',
  providers: [MessageService,ConfirmationService]
})
export class DiscountsComponent implements OnInit {
  discountInput: Discounts = <Discounts>{};
  orgId: number | undefined = 0;

  editingDiscount: Discounts | null = null;
  clearAndAddVisible = false;

  discountList: Discounts[] = [];
  selectedDiscount: Discounts = <Discounts>{};

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userFacade: UsersFacade,
    private discountService: DiscountsService
  ) {}

  ngOnInit() {
    this.userFacade.authenticatedUser$
      .pipe(
        tap((user) => {
          this.orgId = user?.orgId;
        })
      )
      .subscribe();
    this.loadDiscountList(this.orgId);
  }

  private formatDate(date: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  }

  selectDiscount(discount: Discounts) {
    this.selectedDiscount = discount;
  }

  editDiscount(discount: Discounts) {
    this.editingDiscount = { ...discount };
    this.discountInput = {
      ...discount,
      startDate: this.formatDate(discount.startDate),
      endDate: this.formatDate(discount.endDate),
    };
    this.clearAndAddVisible = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  loadDiscountList(orgId: number | undefined): void {
    this.loading = true;
    this.discountService.loadDiscounts(this.orgId).subscribe({
      next: (discount) => {
        this.discountList = discount;
        console.log(this.discountList);
        this.loading = false;
      },
    });
  }
  submitDiscount(discount: Discounts): void {
    discount.orgId = this.orgId;

    if (this.editingDiscount) {
      // Update existing discount
      this.editingDiscount.discountPercentage = discount.discountPercentage;
      this.editingDiscount.startDate = discount.startDate;
      this.editingDiscount.endDate = discount.endDate;
      this.editingDiscount.orgId = discount.orgId;
      this.editingDiscount.discountId = discount.discountId;

      this.discountService.editDiscount(this.editingDiscount).subscribe({
        complete: () => {
          this.messageService.add({
            key: 'successMessage',
            severity: 'success',
            summary: 'Discount updated',
            detail: 'Discount entry was updated!',
          });

          setTimeout(() => 2000);
          this.loadDiscountList(this.orgId);
          this.editingDiscount = null;
          this.clearAndAddVisible = false;
          this.clearAndAddDiscount();
        },
        error: () => {
          this.messageService.add({
            key: 'errorMessage',
            severity: 'error',
            summary: 'Discount update failed!',
            detail: 'Discount entry was not updated!',
          });
        },
      });

    } else {
      this.discountService.addNewdiscount(discount).subscribe({
        complete: () => {
          this.messageService.add({
            key: 'successMessage',
            severity: 'success',
            summary: 'Discount Saved',
            detail: 'Discount entry was saved!',
          });

          setTimeout(() => 2000);
          this.loadDiscountList(this.orgId);
        },
        error: () => {
          this.messageService.add({
            key: 'errorMessage',
            severity: 'error',
            summary: 'Discount save failed!',
            detail: 'Discount entry was not saved!',
          });
        },
      });
    }
  }

  confirmDeleteDiscount(discount: Discounts) {
    console.log("Selected dicount",discount);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this discount?',
      accept: () => {
          this.discountService.deleteDiscounts(discount.discountId).subscribe({
            complete: () => {
              this.messageService.add({
                key: 'successMessage',
                severity: 'success',
                summary: 'Discount removed',
                detail: 'Discount entry was removed!',
              });

              setTimeout(() => 2000);
              this.loadDiscountList(this.orgId);
            },
            error: () => {
              this.messageService.add({
                key: 'errorMessage',
                severity: 'error',
                summary: 'Discount remove failed!',
                detail: 'Discount entry was not removed!',
              });
            },
          });
      },
      reject: () => {
        // Do nothing if deletion is canceled
      },
    });
  }

  clearAndAddDiscount() {
    this.discountInput = <Discounts>{};
    this.editingDiscount = null;
    this.clearAndAddVisible = false;
  }
}

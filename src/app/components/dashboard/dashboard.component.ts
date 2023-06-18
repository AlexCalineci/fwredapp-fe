import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/components/layout/service/app.layout.service';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats } from '../../model/DashboardStats';
import { FoodItems } from '../../model/FoodItems';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  items!: MenuItem[];
  dashboardStats: DashboardStats = <DashboardStats>{};
  foodItemsStats: FoodItems[] = [];

  constructor(
    public layoutService: LayoutService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  ngOnDestroy() {}

  loadStats(): void {
    this.dashboardService.getDashboardStats().subscribe((stats) => {
      this.dashboardStats = stats;
    });
    this.dashboardService
      .getFoodItemsStats()
      .subscribe((foodItems) => (this.foodItemsStats = foodItems));
  }
}

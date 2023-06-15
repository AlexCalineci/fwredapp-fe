import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./components/layout/app.layout.component";
import {LandingComponent} from "./components/landing/landing.component";
import {AuthGuard} from "./services/authguard";
import {NotfoundComponent} from "./components/notfound/notfound.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: LandingComponent,
      },
      {
        path: '', component: AppLayoutComponent,
        children: [
          { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate: [AuthGuard] },
          { path: 'food-items', loadChildren: () => import('./components/food-items/food-items.module').then(m => m.FoodItemsModule),canActivate: [AuthGuard] },
          { path: 'delivery-points', loadChildren: () => import('./components/delivery-points/delivery-points.module').then(m => m.DeliveryPointsModule),canActivate: [AuthGuard] },
          { path: 'donation-map', loadChildren: () => import('./components/donation-map/donation-map.module').then(m => m.DonationMapModule),canActivate: [AuthGuard] },
          { path: 'reservations', loadChildren: () => import('./components/reservations/reservations.module').then(m => m.ReservationsModule),canActivate: [AuthGuard] },
          { path: 'discounts', loadChildren: () => import('./components/discounts/discounts.module').then(m => m.DiscountsModule),canActivate: [AuthGuard] },
          { path: 'feedback-ratings', loadChildren: () => import('./components/feedback-ratings/feedback-ratings.module').then(m => m.FeedbackRatingsModule),canActivate: [AuthGuard] },
        ]
      },
      { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
      { path: 'registration', loadChildren: () => import('./components/registration/registration.module').then(m => m.RegistrationModule) },
      { path: '', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
      { path: 'notfound', component: NotfoundComponent },
      { path: '**', redirectTo: '/notfound' },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

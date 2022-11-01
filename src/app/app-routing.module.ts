import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './guards/authorized.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { MonetizationComponent } from './pages/admin/monetization/monetization.component';
import { LoginComponent } from './pages/login/login.component';
import { AddProductComponent } from './pages/merchant/add-product/add-product.component';
import { CustomerOrdersComponent } from './pages/merchant/customer-orders/customer-orders.component';
import { DeliveredComponent } from './pages/merchant/customer-orders/delivered/delivered.component';
import { ToDeliverComponent } from './pages/merchant/customer-orders/to-deliver/to-deliver.component';
import { ToPackComponent } from './pages/merchant/customer-orders/to-pack/to-pack.component';
import { ToRecieveComponent } from './pages/merchant/customer-orders/to-recieve/to-recieve.component';
import { DashboardComponent } from './pages/merchant/dashboard/dashboard.component';
import { MerchantComponent } from './pages/merchant/merchant.component';
import { PostedItemsComponent } from './pages/merchant/posted-items/posted-items.component';
import { SettingsComponent } from './pages/merchant/settings/settings.component';
import { StartSellingComponent } from './pages/merchant/start-selling/start-selling.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path : 'login', component : LoginComponent
  },
  {
    path : 'signup', component : SignupComponent
  },
  {
    path : 'merchant', redirectTo : '/merchant/customer-orders/to-pack', pathMatch : 'full'
  },
  {
    path : 'merchant/customer-orders', redirectTo : '/merchant/customer-orders/to-pack', pathMatch : 'full'
  },
  {
    path : '', redirectTo : '/login', pathMatch : 'full'
  },
  {
    path : 'admin', component : AdminComponent, children : [
      {
        path : 'monetization', component : MonetizationComponent
      }
    ]
  },
  {
    path : 'merchant', component : MerchantComponent, canActivate : [AuthorizedGuard], children : [
      {
        path : 'customer-orders', component : CustomerOrdersComponent, children : [

          {
            path : 'to-pack', component : ToPackComponent
          },
          {
            path : 'to-deliver', component : ToDeliverComponent
          },
          {
            path : 'delivered', component : DeliveredComponent
          },

          // {
          //   path : 'to-recieve', component : ToRecieveComponent
          // },

        ]
      },
      {
        path : 'add-product', component : AddProductComponent
      },
      {
        path : 'posted-items', component : PostedItemsComponent
      },
      {
        path : 'dashboard', component : DashboardComponent
      },
      {
        path : 'start-selling', component : StartSellingComponent
      },
      {
        path : 'settings', component : SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

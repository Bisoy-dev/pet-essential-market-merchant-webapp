import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { MonetizationComponent } from './pages/admin/monetization/monetization.component';
import { MerchantComponent } from './pages/merchant/merchant.component';
import { CustomerOrdersComponent } from './pages/merchant/customer-orders/customer-orders.component';
import { ToPackComponent } from './pages/merchant/customer-orders/to-pack/to-pack.component';
import { ToDeliverComponent } from './pages/merchant/customer-orders/to-deliver/to-deliver.component';
import { ToRecieveComponent } from './pages/merchant/customer-orders/to-recieve/to-recieve.component';
import { DeliveredComponent } from './pages/merchant/customer-orders/delivered/delivered.component';
import { DeliveredOrderComponent } from './components/customer-orders/delivered-order/delivered-order.component';
import { PackOrderComponent } from './components/customer-orders/pack-order/pack-order.component';
import { AddProductComponent } from './pages/merchant/add-product/add-product.component';
import { PostedItemsComponent } from './pages/merchant/posted-items/posted-items.component';
import { PostedItemComponent } from './components/posted-items/posted-item/posted-item.component';
import { ToDeliverOrderComponent } from './components/customer-orders/to-deliver-order/to-deliver-order.component';
import { DashboardComponent } from './pages/merchant/dashboard/dashboard.component';
import { SpinnerComponent } from './components/spinner/spinner.component'
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './components/map/map.component';
import { StartSellingComponent } from './pages/merchant/start-selling/start-selling.component';
import { SettingsComponent } from './pages/merchant/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    AdminComponent,
    MonetizationComponent,
    MerchantComponent,
    CustomerOrdersComponent,
    ToPackComponent,
    ToDeliverComponent,
    ToRecieveComponent,
    DeliveredComponent,
    DeliveredOrderComponent,
    PackOrderComponent,
    AddProductComponent,
    PostedItemsComponent,
    PostedItemComponent,
    ToDeliverOrderComponent,
    DashboardComponent,
    SpinnerComponent,
    MapComponent,
    StartSellingComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

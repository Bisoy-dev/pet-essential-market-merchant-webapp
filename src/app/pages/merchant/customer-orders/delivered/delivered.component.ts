import { Component, OnInit } from '@angular/core';
import { user_local_storage_key } from 'src/app/constants/keys';
import { UserLogged } from 'src/app/models/userLogged.model';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-delivered',
  templateUrl: './delivered.component.html',
  styleUrls: ['./delivered.component.css']
})
export class DeliveredComponent implements OnInit {

  user : UserLogged
  checkouts : any[] = []
  _isLoading : boolean = true;
  _message : string = 'Loading...'
  constructor(private _checkoutService : CheckoutService) {
    _checkoutService.dataLoadListener()
      .subscribe(val => {
        this._isLoading = val;
      })
      this.user = JSON.parse(localStorage.getItem(user_local_storage_key)!) as UserLogged
   }

  ngOnInit(): void {
    this.loadDelivered();
  }

  loadDelivered() : void {
    this._checkoutService.dataLoadTrigger();
    this._checkoutService.getByMerchant(this.user.accountId, 'delivered')
      .subscribe(data => {
        this.checkouts = data;
        this._checkoutService.dataLoadTrigger(false)
        this._message = this.checkouts.length > 0 ? '' : 'No data found.'
        console.log(this.checkouts)
      }, err => {
        this._message = 'Something went wrong.'
        this._checkoutService.dataLoadTrigger(false)
      })
  }
}

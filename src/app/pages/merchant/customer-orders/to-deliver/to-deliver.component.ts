import { Component, OnInit } from '@angular/core';
import { user_local_storage_key } from 'src/app/constants/keys';
import { UserLogged } from 'src/app/models/userLogged.model';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-to-deliver',
  templateUrl: './to-deliver.component.html',
  styleUrls: ['./to-deliver.component.css']
})
export class ToDeliverComponent implements OnInit {

  checkouts: any[] = []
  _isLoading : boolean = true;
  _message : string = 'Loading...'
  user : UserLogged
  constructor(private _checkoutService : CheckoutService) {
    this.user = JSON.parse(localStorage.getItem(user_local_storage_key)!) as UserLogged

    _checkoutService.dataLoadListener()
      .subscribe(val => {
        this._isLoading = val;
      })
   }

  ngOnInit(): void {
    this.loadToDeliver();
  }

  loadToDeliver() : void {
    this._checkoutService.dataLoadTrigger();
    this._checkoutService.getByMerchant(this.user.accountId, 'to-deliver')
      .subscribe(data => {
        this.checkouts = data;
        this._message = this.checkouts.length > 0 ? '' : 'No orders to be deliver'
        this._checkoutService.dataLoadTrigger(false)
        console.log(this.checkouts)
      }, err => {
        this._message = 'Something went wrong.'
        this._checkoutService.dataLoadTrigger(false)
      })
  }

}

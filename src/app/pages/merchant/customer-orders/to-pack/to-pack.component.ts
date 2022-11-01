import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { user_local_storage_key } from 'src/app/constants/keys';
import { Checkout } from 'src/app/models/checkout.model';
import { UserLogged } from 'src/app/models/userLogged.model';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-to-pack',
  templateUrl: './to-pack.component.html',
  styleUrls: ['./to-pack.component.css']
})
export class ToPackComponent implements OnInit {

  user : UserLogged
  data : Checkout[]
  checkouts : any[]
  _isDataLoad : boolean = true;
  message : string = 'Loading...'
  constructor(public _checkoutService : CheckoutService, private _snackBar : MatSnackBar) {
    this.user = JSON.parse(localStorage.getItem(user_local_storage_key)!) as UserLogged;
    _checkoutService.dataLoadListener()
      .subscribe(val => {
        this._isDataLoad = val
      })
  }

  ngOnInit(): void {
    this.loadCheckouts();
  }

  loadCheckouts(status : string = 'to-pack') : void {

    this._checkoutService.dataLoadTrigger();
    this._checkoutService.getByMerchant(this.user.accountId, status)
      .subscribe((data) => {
        this.checkouts = data;
        this.data = this.checkouts.map(c => new Checkout(false, c))
        this._checkoutService.dataLoadTrigger(false);
        this.message = this.checkouts.length > 0 ? '' : 'No orders to be pack.'
        console.log(this.data)
      }, err => {
        this._checkoutService.dataLoadTrigger(false);
        this.message = 'Something went wrong.'
      })
  }

  onDeliver(data : Checkout) : void {
    console.log(data)
    data.submit = !data.submit
    const transactionId  = data.checkout.transactionId;
    const status = "to-deliver"
    console.log({transactionId, status})
    this._checkoutService.updateStatus({
      transactionId,
      status
    })
    .subscribe(res => {
      data.submit = false;
      console.log(res)
      this._snackBar.open('Status modified!', 'OK')
    }, err => {
      console.log(err)
      data.submit = false;
      this._snackBar.open('Failed to deliver', 'OK')
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { user_local_storage_key } from 'src/app/constants/keys';
import { UiService } from 'src/app/helper/ui.service';
import { Merchant } from 'src/app/models/merchan.model';
import { UserLogged } from 'src/app/models/userLogged.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {
  open : boolean = true
  user : UserLogged
  merchant : Merchant
  isErr : boolean = false
  isLoading : boolean
  constructor(private _uiService : UiService, private _profileService : ProfileService) {
    this.user = JSON.parse(localStorage.getItem(user_local_storage_key)!) as UserLogged
  }

  ngOnInit(): void {
    this._uiService.burgerListener()
      .subscribe(val => {
        this.open = val
      })
      this.loadMerchant();
  }

  loadMerchant() : void {
    this.isLoading = true
    this._profileService.getMerchant(this.user.accountId)
      .subscribe((data) => {
        this.merchant = data
        this.isLoading = false
        console.log(this.merchant)
      }, err => {
        this.isErr = true
        this.isLoading = false
      })
  }


}

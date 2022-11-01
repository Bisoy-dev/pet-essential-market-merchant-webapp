import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { user_local_storage_key } from 'src/app/constants/keys';
import { Merchant } from 'src/app/models/merchan.model';
import { UserLogged } from 'src/app/models/userLogged.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  addressForm : FormGroup
  nameForm : FormGroup
  avatarForm : FormGroup
  contactForm : FormGroup

  _avatarImage : File
  addressSubmit : boolean = false
  _nameSubmit : boolean = false;
  _avatarSubmit : boolean = false;
  _contactSubmit : boolean = false;
  user : UserLogged
  merchant : Merchant
  position : google.maps.LatLngLiteral | null
  constructor(private _profileService : ProfileService, private _snackBar : MatSnackBar) {
    this.user = JSON.parse(localStorage.getItem(user_local_storage_key)!) as UserLogged;
    this.addressForm = new FormGroup({
      name : new FormControl(null, [Validators.required]),
      longitude : new FormControl(null, [Validators.required]),
      latitude : new FormControl(null, [Validators.required]),
      accountId : new FormControl(null, [Validators.required])
    })
    this.nameForm = new FormGroup({
      accountId : new FormControl(null, [Validators.required]),
      name : new FormControl(null, [Validators.required])
    })
    this.avatarForm = new FormGroup({
      img : new FormControl(null, [Validators.required])
    })
    this.contactForm = new FormGroup({
      accountId : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required]),
      number : new FormControl(null, [Validators.required])
    })
    this.addressForm.controls['accountId'].setValue(this.user.accountId);
    this.nameForm.controls['accountId'].setValue(this.user.accountId);
    this.contactForm.controls['accountId'].setValue(this.user.accountId);
   }

  ngOnInit(): void {
    this.loadMerchant();
  }

  setData() : void {
    this.addressForm.controls['longitude'].setValue(this.merchant.address.coordinates.longitude);
    this.addressForm.controls['latitude'].setValue(this.merchant.address.coordinates.latitude);
    this.addressForm.controls['name'].setValue(this.merchant.address.name);
    this.position = {
      lat : Number(this.merchant.address.coordinates.latitude),
      lng : Number(this.merchant.address.coordinates.longitude)
    }

    this.nameForm.controls['name'].setValue(this.merchant.name)
    this.contactForm.controls['number'].setValue(this.merchant.contact.number);
    this.contactForm.controls['email'].setValue(this.merchant.contact.email);
    console.log(this.position)
  }
  onNameUpdate() : void {
    if(this.nameForm.invalid) return;

    this.updateName();
  }

  updateName() : void {
    this._nameSubmit = true;
    this._profileService.updateName(this.nameForm.value)
      .subscribe(res => {
        this._nameSubmit = false;
        this._snackBar.open('Merchant name updated successfully.', 'OK')
      }, err => {
        this._nameSubmit = false;
        this._snackBar.open("Failed to update merchant's name", 'OK')
      })
  }

  onAddressUpdate() : void {
    if(this.addressForm.invalid) return;

    this.updateAddress();
  }

  onUpdateContact() : void {
    if(this.contactForm.invalid) return;

    this.updateContact();
  }

  updateContact() : void {
    this._contactSubmit = true;
    this._profileService.updateContact(this.contactForm.value)
      .subscribe(res => {
        this._contactSubmit = false;
        this._snackBar.open('Contact updated successfully', 'OK')
      }, err => {
        this._contactSubmit = false;
        this._snackBar.open('Failed to update contact', 'OK')
      })

  }

  updateAvatar() : void {
    this._avatarSubmit = true;
    const formData = new FormData();

    formData.append('accountId', this.user.accountId)
    formData.append('img', this._avatarImage, this._avatarImage.name)

    this._profileService.updateAvatar(formData)
      .subscribe(res => {
        this._avatarSubmit = false;
        this._snackBar.open('Avatar updated successfully', 'OK')
        this.merchant = res
        console.log(res)
      }, err => {
        this._avatarSubmit = false;
        this._snackBar.open('Failed to update avatar', 'OK')
      })
  }

  updateAddress() : void {
    this.addressSubmit = true
    this._profileService.updateAddress(this.addressForm.value)
      .subscribe(res => {
        this.addressSubmit = false
        this._snackBar.open('Address updated successfully.', 'OK')
      }, err =>{
        this.addressSubmit = false
        this._snackBar.open('Failed to update address', 'OK')
      })
  }

  onUpdateAvatar() : void {
    if(this.avatarForm.invalid) return;
    this.updateAvatar();
  }

  loadMerchant() : void {
    this._profileService.getMerchant(this.user.accountId)
      .subscribe((data) => {
        this.merchant = data;
        this.setData();
      }, err => {

      })
  }
  onSelectedAvatar(event : any) : void {
    this._avatarImage = <File>event.target.files[0]
    this.avatarForm.controls['img'].setValue(this._avatarImage.name)
    console.log(this._avatarImage)
  }

  onMapClick(event : google.maps.LatLngLiteral) : void {
    // console.log(event)
    this.addressForm.controls['latitude'].setValue(event.lat)
    this.addressForm.controls['longitude'].setValue(event.lng)
  }

}

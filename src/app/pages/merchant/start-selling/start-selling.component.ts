import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { flatMap } from 'rxjs';
import { user_local_storage_key } from 'src/app/constants/keys';
import { Address, Contact, Coordinates, CreateMerchant } from 'src/app/models/merchan.model';
import { UserLogged } from 'src/app/models/userLogged.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-start-selling',
  templateUrl: './start-selling.component.html',
  styleUrls: ['./start-selling.component.css']
})
export class StartSellingComponent implements OnInit {

  submit : boolean = false
  user : UserLogged
  form : FormGroup
  coordinates : Coordinates
  createMerchant : CreateMerchant
  address : Address
  contact : Contact
  constructor(private _snackBar : MatSnackBar, private _profileService : ProfileService) {
    this.form = new FormGroup({
      name : new FormControl(null, [Validators.required]),
      address : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required]),
      number : new FormControl(null, [Validators.required])
    })

    const stringData = localStorage.getItem(user_local_storage_key)
    this.user =  JSON.parse(stringData!) as UserLogged

    this.createMerchant = new CreateMerchant();
    this.coordinates = new Coordinates();
    this.address = new Address();
    this.contact = new Contact();
    console.log(this.user)
  }

  onSubmit() : void {
    if(this.form.invalid) return;
    this.submit = true;
    this.setData()
    this.onCreate();
  }

  onCreate() : void {
    this._profileService.createMerchant(this.createMerchant)
      .subscribe(res => {
        this.submit = false
        this._snackBar.open('Created successfully', 'OK')
      }, err => {
        this.submit = false;
        this._snackBar.open(err.error.message ? err.error.message : 'Failed to create!', 'OK')
        console.log(err)
      })
  }

  setData() : void {
    this.address.name = this.form.controls['address'].value
    this.address.coordinates = this.coordinates;
    this.contact.email = this.form.controls['email'].value
    this.contact.number = this.form.controls['number'].value
    this.createMerchant.accountId = this.user.accountId
    this.createMerchant.avatar = 'https://res.cloudinary.com/diigkcc6g/image/upload/v1662973679/banner_pet_ecommerce_imiwzg.png'
    this.createMerchant.banner = 'https://res.cloudinary.com/diigkcc6g/image/upload/v1662973679/banner_pet_ecommerce_imiwzg.png'
    this.createMerchant.name = this.form.controls['name'].value
    this.createMerchant.address = this.address;
    this.createMerchant.contact = this.contact
    this.createMerchant.visibility = true
    this.createMerchant.riderStatus = 'active';
    this.createMerchant.feePerKilometer = 10
    this.createMerchant.verified = true
    this.createMerchant.serviceHrs = "8:00AM - 9:00PM"

    console.log(this.createMerchant)
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(coor => {

      this.coordinates.latitude = coor.coords.latitude.toString()
      this.coordinates.longitude = coor.coords.longitude.toString();
    })
  }

  clickCoor(event : google.maps.LatLngLiteral) : void {
    // console.log(event)
    if(!event) return;
    this.coordinates.latitude = event.lat.toString();
    this.coordinates.longitude = event.lng.toString();
    // this.createMerchant.address.coordinates = this.coordinates;
    console.log(this.coordinates)
  }

}

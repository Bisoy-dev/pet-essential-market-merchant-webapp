import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { user_local_storage_key } from 'src/app/constants/keys';
import { Merchant } from 'src/app/models/merchan.model';
import { CreateProduct, DateCreate } from 'src/app/models/product.model';
import { UserLogged } from 'src/app/models/userLogged.model';
import { ProductService } from 'src/app/services/product.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  submit : boolean
  isLoad : boolean = true;
  err : any
  form : FormGroup
  files : File[] = []
  images : string[] = []
  date : DateCreate
  productCreate : CreateProduct
  merchant : Merchant
  user : UserLogged
  constructor(private _uploadService : UploadService, private _snackBar : MatSnackBar,
      private _profileService : ProfileService, private _productService : ProductService,
      private _router : Router) {
    this.form = new FormGroup({
      productName : new FormControl(null, [Validators.required]),
      price : new FormControl(null, [Validators.required]),
      description : new FormControl(null, [Validators.required]),
      images : new FormControl(null, [Validators.required, Validators.min(1)]),
      imageNames : new FormControl(null)
    })
    this.user = JSON.parse(localStorage.getItem(user_local_storage_key)!) as UserLogged;
    this.productCreate = new CreateProduct();
    this.date = new DateCreate();
    this.date.createdAt = new Date();
  }

  ngOnInit(): void {
    this.loadMerchant();
  }
  onCreate() : void {
    this.submit = true
    this._productService.create(this.productCreate)
      .subscribe((res) => {
        this.submit = false;
        console.log(res)
        this._snackBar.open('Product created successfully', 'OK')
        this._router.navigateByUrl('/merchant/posted-items')
      }, err => {
        this.submit = false
        console.log(err)
        this._snackBar.open('Failed to create!', 'OK')
      })
  }
  onSubmit() : void {
    if(this.form.invalid) return;

    this.setData();
    // console.log(this.productCreate)
    this.onCreate();
  }

  setData() : void {
    this.productCreate.accountId = this.user.accountId;
    this.productCreate.availability = true;
    this.productCreate.address = this.merchant.address;
    this.productCreate.date = this.date;
    this.productCreate.title = this.form.controls['productName'].value;
    this.productCreate.description = this.form.controls['description'].value;
    this.productCreate.price = this.form.controls['price'].value
  }

  loadMerchant() : void {
    // console.log(this.merchant)
    this.isLoad = true;
    this._profileService.getMerchant(this.user.accountId)
      .subscribe((data) => {
        this.merchant = data;
        console.log(this.merchant)
        this.isLoad = false
      }, err => {
        this.isLoad = false
        this.err = err
      })
  }

  async onChooseFile(event : any) : Promise<void> {
    this.submit = true
    const data = <File[]>event.target.files;
    if(this.files.length > 0 && data.length == 0) return;
    this.files = data
    console.log(data)
    // let imgFileNames = ''
    // for(let img of this.files){
    //   imgFileNames += `${img.name}, `
    // }
    // this.form.controls['imageNames'].setValue(imgFileNames)


    // for(let img of this.files){
    //   const reader = new FileReader()
    //   reader.onload = () => {
    //     this.images.push(reader.result as string)
    //   }
    //   reader.readAsDataURL(img)
    // }
    await this.onUploadImages();
  }

  async onUploadImages() : Promise<void> {
    for(let file of this.files){
      const formData = new FormData();
      formData.append('img', file, file.name);
      const result = await this._uploadService.upload(formData);
      console.log(result)
      this.images.push(result.cdn)
    }

    this.productCreate.images = this.images;
    this.form.controls['images'].setValue(this.images.length)
    this._snackBar.open("Images uploaded successfully", "OK")
    this.submit = false
  }

}

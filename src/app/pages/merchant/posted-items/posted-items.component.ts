import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { user_local_storage_key } from 'src/app/constants/keys';
import { BasicProduct, Product } from 'src/app/models/product.model';
import { UserLogged } from 'src/app/models/userLogged.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-posted-items',
  templateUrl: './posted-items.component.html',
  styleUrls: ['./posted-items.component.css']
})
export class PostedItemsComponent implements OnInit {

  items : any [] = [1,2,3,4,5]
  isLoading : boolean = true
  showSpinner : boolean = true
  message : string = 'Loading products...'
  products : Product[]
  basicProducts : BasicProduct[]
  user : UserLogged
  constructor(private _productService : ProductService, private _snackBar : MatSnackBar) {
    this.user = JSON.parse(localStorage.getItem(user_local_storage_key)!) as UserLogged;

   }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(availability : boolean = true, all : boolean = true) : void {
    this.isLoading = true;
    this._productService.getByMerchant(this.user.accountId, availability, all)
      .subscribe((data) => {
        this.products = data
        this.basicProducts = this.products.map(p => new BasicProduct(p))
        console.log(this.basicProducts)
        this.isLoading = false;
        this.showSpinner = this.products.length > 0
        this.message = 'No products found.'
      }, err => {
        this.isLoading = false;
        this.showSpinner = false
        this.message = 'Something went wrong.'
      })
  }

  onUpdate(basicProduct : BasicProduct) :void {
    // this._snackBar.open(product.title)
    basicProduct.isUpdate = true;
    basicProduct.product.availability = !basicProduct.product.availability;
    this._productService.updateAvailability(basicProduct.product)
      .subscribe(res => {
        basicProduct.isUpdate = false
        this._snackBar.open(`${basicProduct.product.title} is ${basicProduct.product.availability ? 'available now!' : 'not available yet!'}`, 'OK')
      }, err => {
        basicProduct.product.availability = !basicProduct.product.availability
        basicProduct.isUpdate = false;
        this._snackBar.open('Failed to update', 'OK')
      })
  }

  onSelected(availability : boolean, all : boolean) : void {
    this.loadProducts(availability, all)
  }

}

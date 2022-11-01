import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants/url';
import { CreateProduct, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url : string = apiUrl
  constructor(private _client : HttpClient) { }

  create(product : CreateProduct) : Observable<any> {
    return this._client.post<any>(`${this._url}/product`, product);
  }

  getByMerchant(accountId : string, availability : boolean = true, all : boolean = true) : Observable<Product[]>{
    const queryString = all ? '' : `&availability=${availability}`
    return this._client.get<Product[]>(`${this._url}/product?accountId=${accountId}${queryString}`)
  }

  updateAvailability(product : Product) : Observable<any> {
    return this._client.put<any>(`${this._url}/product`, {
      _id : product._id,
      availability : product.availability
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants/url';
import { CreateMerchant, Merchant } from '../models/merchan.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _url : string = apiUrl;
  constructor(private _client : HttpClient) { }

  getProfile(id : any) : Observable<any> {
    return this._client.get(`${this._url}/profile/${id}`)
  }
  getMerchant(accountId : string) : Observable<Merchant>{
    return this._client.get<any>(`${this._url}/profile/merchant/${accountId}`)
  }

  updateAddress(data : any) : Observable<any>{
    return this._client.put(`${this._url}/profile/merchant/address`, data);
  }

  updateName(data : any) : Observable<any>{
    return this._client.put(`${this._url}/profile/merchant`, data);
  }

  updateContact(data : any) : Observable<Merchant>{
    return this._client.put<Merchant>(`${this._url}/profile/merchant/contact`, data);
  }

  updateAvatar(data : FormData) : Observable<Merchant>{
    return this._client.put<Merchant>(`${this._url}/profile/merchant/avatar`, data);
  }

  createMerchant(merchant : CreateMerchant) : Observable<any> {
    return this._client.post<any>(`${this._url}/profile/merchant`, merchant)
  }
}

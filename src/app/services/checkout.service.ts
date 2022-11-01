import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from '../constants/url';
import { Checkout } from '../models/checkout.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private _url : string = apiUrl
  private _isDataLoadSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private _client : HttpClient) { }

  dataLoadListener() : Observable<boolean> {
    return this._isDataLoadSubject.asObservable();
  }

  dataLoadTrigger(isLoad : boolean = true) : void {
    this._isDataLoadSubject.next(isLoad)
  }

  getByMerchant(accountId : string, status : string = 'to-deliver') : Observable<any[]> {
    return this._client.get<any[]>(`${this._url}/checkout/get-by-merchants?accountId=${accountId}&status=${status}`)
  }

  updateStatus(data : any) : Observable<any> {
    return this._client.put<any>(`${this._url}/checkout`, data);
  }
}

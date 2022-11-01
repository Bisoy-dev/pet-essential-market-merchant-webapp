import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private _url : string = apiUrl
  constructor(private _client : HttpClient) { }

  create(data : FormData) : Observable<any>{
    return this._client.post<any>(this._url + '/ticket/verification', data)
  }

  getTickets(status : string = 'pending') : Observable<any[]> {
    return this._client.get<any[]>(`${this._url}/ticket/verification?status=${status}`)
  }

  updateTicket(data : any) : Observable<any> {
    return this._client.put<any>(`${this._url}/ticket/verification`, data)
  }
}

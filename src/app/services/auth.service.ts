import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants/url';
import { UserLogged } from '../models/userLogged.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url : string = apiUrl
  constructor(private _client : HttpClient) { }

  login(user : any) : Observable<UserLogged>{
    // const options = {
    //   headers : new HttpHeaders()
    //     .append('Content-Type', 'application/json'),
    //   mode : 'cors'
    // }
    return this._client.post<UserLogged>(this._url + '/user/login', user)
  }
}

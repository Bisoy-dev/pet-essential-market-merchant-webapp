import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private _url : string = apiUrl
  constructor(private _client : HttpClient) { }

   async upload(fd : FormData) : Promise<any> {
    return this._client.post<any>(`${this._url}/upload/image`, fd).toPromise();
  }
}

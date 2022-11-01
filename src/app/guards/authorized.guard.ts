import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { user_local_storage_key } from '../constants/keys';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(private _route : Router){
  }
  canActivate() {
    if(!!localStorage.getItem(user_local_storage_key)) return true;

    this._route.navigateByUrl('/login')
    return false;
  }

}

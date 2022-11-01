import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Merchant } from '../models/merchan.model';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private _burger : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _burgerShow : BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _profileSection : BehaviorSubject<any> = new BehaviorSubject<any>({})
  private _ticket : BehaviorSubject<Merchant> = new BehaviorSubject<Merchant>(new Merchant())
  constructor() { }

  burgerToggle(show : boolean) : void {
    this._burger.next(show)
  }

  burgerListener() : Observable<boolean>{
    return this._burger.asObservable();
  }

  burgerShow(show : boolean) : void {
    this._burgerShow.next({
      show : show
    })
  }
  burgerShowListener() : Observable<any> {
    return this._burgerShow.asObservable();
  }

  profileSectionToggle(show : boolean) : void {
    this._profileSection.next({
      show : show
    })
  }
  profileSectionListener() : Observable<any>{
    return this._profileSection.asObservable()
  }
  ticketTrigger(data : Merchant) : void {
    this._ticket.next(data)
  }
  ticketListener() : Observable<Merchant> {
    return this._ticket.asObservable();
  }
}

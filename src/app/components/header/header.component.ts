import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { user_local_storage_key } from 'src/app/constants/keys';
import { UiService } from 'src/app/helper/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  show : boolean = true;
  showBurger : boolean = false
  profileSectionShow : boolean = false;

  _url : string = ''
  constructor(private _uiService : UiService, private _route : Router) {
    _uiService.burgerShowListener()
      .subscribe(val => {
        this.showBurger = val.show;
      })
    _uiService.profileSectionListener()
      .subscribe(val => {
        this.profileSectionShow = val.show
      })
    _route.events.subscribe(event => {
      if(event instanceof NavigationStart){
        const route = <NavigationStart>event;
        this._url = route.url;
      }
    })
    this.showBurger = this.isLogged();
    this.profileSectionShow = this.isLogged();
  }

  ngOnInit(): void {


  }
  onToggle() : void {
    this.show = !this.show;
    this._uiService.burgerToggle(this.show)
    console.log(localStorage.getItem(user_local_storage_key)?.toString())
  }

  isLogged() : boolean {
    return !!localStorage.getItem(user_local_storage_key)
  }

  logout() : void {
    localStorage.clear();
    this._uiService.burgerShow(false)
    this._uiService.profileSectionToggle(false)
    this._route.navigateByUrl('/login')
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  	currentUrl : string = '';
  constructor(private _route : Router) {
    _route.events.subscribe(event => {
      if(event instanceof NavigationStart){
        const e = <NavigationStart>event
        // console.log(e.url)
        this.currentUrl = e.url
      }
    })
  }
  ngOnInit(): void {
    // console.log(this._route.url)
    this.currentUrl = this._route.url;
  }

}

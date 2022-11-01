import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivered-order',
  templateUrl: './delivered-order.component.html',
  styleUrls: ['./delivered-order.component.css']
})
export class DeliveredOrderComponent implements OnInit {

  @Input() checkout : any
  constructor() { }

  ngOnInit(): void {
  }

  total() : number {
    return Number(this.checkout.content.total)
  }

}

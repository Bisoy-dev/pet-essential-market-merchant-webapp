import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-deliver-order',
  templateUrl: './to-deliver-order.component.html',
  styleUrls: ['./to-deliver-order.component.css']
})
export class ToDeliverOrderComponent implements OnInit {

  @Input() checkout : any
  constructor() { }

  ngOnInit(): void {
  }

  total() : number {
    return Number(this.checkout.content.total)
  }
}

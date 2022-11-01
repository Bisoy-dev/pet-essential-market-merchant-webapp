import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Checkout } from 'src/app/models/checkout.model';

@Component({
  selector: 'app-pack-order',
  templateUrl: './pack-order.component.html',
  styleUrls: ['./pack-order.component.css']
})
export class PackOrderComponent implements OnInit {

  @Input() checkout : any
  @Input() data : Checkout
  @Input() submit : boolean;
  @Output() toDeliverEvent : EventEmitter<Checkout> = new EventEmitter<Checkout>();

  seeMore : boolean  = false
  text : string = 'SEE MORE'

  constructor() { }

  ngOnInit(): void {
    console.log(this.data.checkout.content)
  }

  onDeliver() : void {
    this.toDeliverEvent.emit(this.data)
  }

  total() : number {
    return Number(this.data.checkout.content.total)
  }

  seeToggle() : void {
    this.seeMore = !this.seeMore;
    this.text = this.seeMore ? 'SEE LESS' : 'SEE MORE'
  }

}

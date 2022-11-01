import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicProduct, Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-posted-item',
  templateUrl: './posted-item.component.html',
  styleUrls: ['./posted-item.component.css']
})
export class PostedItemComponent implements OnInit {
  @Input() basicProduct : BasicProduct
  @Output() updateAvailabilty : EventEmitter<BasicProduct> = new EventEmitter<BasicProduct>();
  constructor() { }

  ngOnInit(): void {
  }

  onUpdate() : void {
    this.updateAvailabilty.emit(this.basicProduct)
  }
}

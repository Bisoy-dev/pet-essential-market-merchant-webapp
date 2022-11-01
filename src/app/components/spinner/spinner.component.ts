import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() spinnerShow : boolean = true
  @Input() diameter : number = 70;
  @Input() showWhen : boolean = false
  @Input() message : string = "Please wait..."
  @Input() text : string = "Reload"
  @Input() spinnerOnly : boolean = false
  @Output() onClick : EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  click(event : any) : void {

  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/helper/ui.service';
import { Merchant } from 'src/app/models/merchan.model';
import { TicketService } from 'src/app/services/ticket.service';
@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.css']
})
export class BasicDialogComponent implements OnInit {

  done : boolean = false;
  submitting : boolean = false;
  @Output() onClose : EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit : EventEmitter<File> = new EventEmitter<File>();
  @Input() submit : boolean = false

  file : File
  fileName : string = ''
  merchant : Merchant
  constructor(private _uiService : UiService, private _ticketService : TicketService) {
    _uiService.ticketListener()
      .subscribe(data => {
        this.merchant = data;
        console.log('merchant from dialog')
      })
  }

  ngOnInit(): void {
  }

  close() : void {
    this.onClose.emit({})
    this.submit = true
  }

  submitTicket() : void {
    if(!this.file) return;
    // this.onSubmit.emit(this.file)
    const formData = new FormData();
    formData.append("accountId", this.merchant.accountId)
    formData.append("role", "shop")
    formData.append("img", this.file, this.file.name)
    this.onSubmitTicket(formData)
  }

  onSubmitTicket(form : FormData): void {
    this.submitting = true
    this._ticketService.create(form)
      .subscribe(res => {
        this.submitting = false
        this.done = true
      }, err => {
        this.submitting = false;
        console.log(err)
      })
  }

  onSelectFile(event : any) : void {
    this.file = <File>event.target.files[0]
    this.fileName = this.file.name;
  }

}

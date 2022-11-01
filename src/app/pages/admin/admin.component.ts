import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/constants/url';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  tickets : any[] = []
  data : any[] = []
  spinner : boolean = true
  message : string = "Please wait..."
  private _baseUrl = apiUrl + '/monetization/txn'
  constructor(private _cleint : HttpClient, private _ticketService : TicketService,
    private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
    this.loadTickets()
  }

  loadBills() : Observable<any[]>{
    return this._cleint.get<any[]>(this._baseUrl)
  }

  loadTickets() : void {
    this._ticketService.getTickets()
      .subscribe(data => {
        this.tickets = data;
        console.log(this.tickets)
      })
  }

  loadData() : void {

    this.loadBills().subscribe(res => {
      this.data = res
      this.spinner = false
      this.message = this.data.length > 0 ? '' : 'No data found!'
      console.log(res)
    }, err => {
      this.spinner = false
      this.message = 'Something went wrong!'
    })
  }

  refresh() : void {
    // window.location.reload()
    this.spinner = true;
    this.message = 'Please wait...'
    this.loadData();
  }

  update(ticket : any) : void {
    const data  = {
      _id: ticket._id,
      accountId: ticket.accountId,
      role: ticket.role,
      isVerified: true,
      ticketStatus: "verified"
    }
    // console.log(data)
    this.onUpdateTicket(data)
  }

  onUpdateTicket(data : any) : void {
    this._ticketService.updateTicket(data)
      .subscribe((res) => {
        this._snackBar.open('Updated successfully', "OK")
      },  err => {
        this._snackBar.open('Failed to update', 'OK')
      })
  }

}

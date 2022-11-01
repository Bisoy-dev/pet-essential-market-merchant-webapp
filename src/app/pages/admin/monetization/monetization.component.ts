import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/constants/url';

@Component({
  selector: 'app-monetization',
  templateUrl: './monetization.component.html',
  styleUrls: ['./monetization.component.css']
})
export class MonetizationComponent implements OnInit {

  data : any[] = []
  spinner : boolean = true
  message : string = "Please wait..."
  private _baseUrl = apiUrl + '/monetization/txn'
  constructor(private _cleint : HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadBills() : Observable<any[]>{
    return this._cleint.get<any[]>(this._baseUrl)
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

}

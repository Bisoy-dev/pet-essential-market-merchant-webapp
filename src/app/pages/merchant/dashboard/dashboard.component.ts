import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  center : google.maps.LatLngLiteral = {
    lat : 8.3065,
    lng : 124.2699
  }
  index : number = 0
  positions : google.maps.LatLngLiteral[] = []
  constructor() { }

  ngOnInit(): void {
    // this.positions.push(this.center)
    navigator.geolocation.getCurrentPosition((coor) => {
      // console.log(coor.coo)
      this.center.lat = coor.coords.latitude;
      this.center.lng = coor.coords.longitude;
      this.positions.push({
        lat : coor.coords.latitude,
        lng : coor.coords.longitude
      })
      console.log(coor)
    })

  }

  addMark(event : google.maps.MapMouseEvent) : void {
    if(event.latLng) this.positions.push(event.latLng?.toJSON())
    this.index = this.positions.length === 0 ? 0 : this.positions.length - 1;
    console.log(this.positions[this.index])
  }

}

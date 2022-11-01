import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() position : google.maps.LatLngLiteral | null
  @Input() height : string = '400px'
  @Input() width : string = '750px'
  @Output() onClick : EventEmitter<google.maps.LatLngLiteral> = new EventEmitter<google.maps.LatLngLiteral>();
  center : google.maps.LatLngLiteral = {
    lat : 8.3065,
    lng : 124.2699
  }
  index : number = 0
  positions : google.maps.LatLngLiteral[] = []

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
};
  constructor() { }

  ngOnInit(): void {
    // this.positions.push(this.center)
    // navigator.geolocation.getCurrentPosition((coor) => {
    //   // console.log(coor.coo)
    //   this.center.lat = coor.coords.latitude;
    //   this.center.lng = coor.coords.longitude;
    //   this.positions.push({
    //     lat : coor.coords.latitude,
    //     lng : coor.coords.longitude
    //   })
    //   console.log(coor)
    // })
    if(!this.position){
      navigator.geolocation.getCurrentPosition((coor) => {
        // console.log(coor.coo)
        this.center.lat = coor.coords.latitude;
        this.center.lng = coor.coords.longitude;
        this.positions.push({
          lat : coor.coords.latitude,
          lng : coor.coords.longitude
        })
        console.log(coor)
        console.log('not')
      })
    }else{
      this.positions.push(this.position)
    }

  }

  addMark(event : google.maps.MapMouseEvent) : void {
    if(event.latLng) this.positions.push(event.latLng?.toJSON())
    this.index = this.positions.length === 0 ? 0 : this.positions.length - 1;
    // console.log(this.positions[this.index])
    this.onClick.emit(this.positions[this.index]);
  }

}

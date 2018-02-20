import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { Stop } from './stop.entity';

const GET_ALL_STOPS = '/api/stops/all';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.css']
})
export class StopsComponent implements OnInit {

  stops: Stop[] =[];
  stopsNames: string[] =[];

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.getAllStops();
  }

  getAllStops(): void {
    this._http.doGet( GET_ALL_STOPS ).subscribe(res => {
      this.stops = res;
      this.extractNames(this.stops);
    });
  }

  extractNames(arr: Stop[]):void {
    this.stops.forEach(stop => {
      if (!this.stopsNames.includes(stop.title)){
        this.stopsNames.push(stop.title);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { Stop } from './stop.entity';
//import { SearchPipe } from '../search.pipe';

const GET_ALL_STOPS = '/api/stops/all';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.css']
})
export class StopsComponent implements OnInit {

  searchText: string;
  stops: Stop[] =[];
  stopsNames: string[] =[];
  firstLetters: string[] = [];

  constructor(private _http: HttpService, private router: Router) { }

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

  viewStopDetails(stopTitle: string):void {
    this.router.navigate(['stops/datails', {title: stopTitle}])
  }

  addFirstLetter(letter: string) : void {
    this.firstLetters.push(letter);
  }
}

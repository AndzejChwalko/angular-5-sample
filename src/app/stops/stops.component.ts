import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
  
  searchText: string;
  stops: Stop[] =[];
  stopsNames: string[] =[];
  firstLetters: Array<string> = [];

  constructor(private _http: HttpService, private router: Router, private ref: ChangeDetectorRef) {
   }

  ngOnInit() {
    this.getAllStops();
  }

  goToSection(letter: string): void {
    try {
      document.querySelector('#' + letter).scrollIntoView();
    } catch (e) { console.log(e);}
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
    if (!this.firstLetters.includes(letter)){
      this.firstLetters.push(letter);
      this.ref.detectChanges();
    }
  }
}

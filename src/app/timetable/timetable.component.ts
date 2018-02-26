import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  @Input() table: any;
  @Input() nearest: string;
  hours: string[];

  nearHour: string;
  nearMin: string;

  constructor() { }

  ngOnInit() {
    this.hours = Object.keys(this.table);
    if (this.nearest.indexOf(':') > -1){
      let parts = this.nearest.split(':');
      this.nearHour = parts[0];
      this.nearMin = parts[1];
    }
  }

  prepareMinutes(minutes: any) : string[] {
      let result = []
      if (minutes.length === 0){
        return result;
      }

      for(let min of minutes){ result.push(min);  }

      for(let i=0; i < result.length; i++){
        result[i] = "." + result[i];
      }
      return result;
  }

  isNearestTime(hour: string, minutes?: string) : boolean {
    let sameHour = hour === this.nearHour;
    if (minutes !== undefined){
      let sameMinutes = minutes.substring(1, minutes.length) === this.nearMin;
      if ( sameHour && sameMinutes ) { return true;}
    } else {
      if (sameHour) { return true;}
    }
    return false;
  }

}

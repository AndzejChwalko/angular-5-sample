import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

const GET_ALL_TIMINGS_BY_STOP_TITLE = '/api/stops/';
const GET_ROUTE_BUS = '/api/routes/bus/';
const GET_ROUTE_TROLLEYBUS = '/api/routes/trolleybus/';

@Component({
  selector: 'app-stop-details',
  templateUrl: './stop-details.component.html',
  styleUrls: ['./stop-details.component.css']
})
export class StopDetailsComponent implements OnInit {
  now: Date = new Date();
  nowForTimings: Date = new Date();
  weekday: boolean;
  stopTitle: string ;
  timings: any[] = [];
  result: any[] = [];
  groupByProperty: object = {groupBy: 'route.type', orderBy: 'route.title', direction: 1, typeOrder: 'number'};

  constructor(private _http: HttpService, private router: Router, private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => {
      if(params['title']){
        this.stopTitle = params['title'];
        this._http.doPost(GET_ALL_TIMINGS_BY_STOP_TITLE, {name:params['title']}, ).subscribe(res => {
          this.timings = res;
         
          // remove dulicates (with same stop)
          res = res.reduce((prev, curr)=> {
            let duplicate = false;
            for (let elem of prev){
              if (elem.stop.id === curr.stop.id && elem.route.title === curr.route.title ) { 
                duplicate = true;
                if (elem.index > curr.index){ 
                  let pos = prev.indexOf(elem);
                  prev.splice(pos, 1);
                  prev.push(curr);
                }
               }
            }
            if (!duplicate){
              prev.push(curr);
            }
            return prev;
          }, []);

         res.forEach(element => {
            let title = element.route.title;
            if (element.route.type === 'BUS'){
              this._http.doGet(GET_ROUTE_BUS + title +'/essentials', {direct:element.route.direct}).subscribe(res => {
               this.result.push({
                route: element.route,
                essentials: res,
                weekday: element.weekdayTable,
                weekend: element.weekendTable
               })
              });
            } else if (element.route.type === 'TROLLEYBUS'){
              this._http.doGet(GET_ROUTE_TROLLEYBUS + title + '/essentials', {direct:element.route.direct}).subscribe(res => {
                this.result.push({
                  route: element.route,
                  essentials: res,
                  weekday: element.weekdayTable,
                  weekend: element.weekendTable
                });
              });
            } else {
              throw new Error('Unkown transport type');
            }
          });  
        });
      }
    });
  }

  ngOnInit() {
    setInterval(()=>{
      this.now = new Date();
    }, 1000);
    setInterval(()=>{
      this.nowForTimings = new Date();
    }, 30000);
    let day = new Date().getDay();
    this.weekday = day < 1 || day > 5;
  }

  currentDay(): string {
    let day = this.now.getDay();
    return day > 5 || day < 1 ? 'Weekend': 'Weekday';
  }

  getNearestTime(route: any): any {
    let hours = this.nowForTimings.getHours();
    let currentMinutes = this.nowForTimings.getMinutes();
    let find = 'No more today!';

    for(let item of this.result){
      if (item.route.id == route.id){
        let timings = item.weekday.data;
        if (this.nowForTimings.getDay() > 5 || this.nowForTimings.getDay() < 1){
          timings = item.weekend.data;
        } 
        let keys = Object.keys(timings);
        for(let key of keys){
          if (parseInt(key) >= hours){
            let delta = 73;
            for(let minutes of timings[key]){
              let d = minutes - currentMinutes;
              delta =(((hours == parseInt(key)) && d > 0 && d < delta) || ((hours < parseInt(key))) && d < delta) ? d : delta;
            }
            if (delta !== 73){
              let nearMinutes = currentMinutes + delta;
              find = key + ':' + (nearMinutes > 9 ? nearMinutes : '0' + nearMinutes);
              return find;
            }
          }
        }
      }
    }
    return find;
  }

  showTimeTable(element: any) :void{
    element.show = !element.show; 
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  now: Date = new Date();
  hours: string;
  minutes: string;
  seconds: string;
  interval: any;

  constructor() { 
    this.interval = setInterval(()=>{
      this.now = new Date();
      this.hours = this.addFirstZero(this.now.getHours());
      this.minutes = this.addFirstZero(this.now.getMinutes());
      this.seconds = this.addFirstZero(this.now.getSeconds()); 
    }, 1000);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if (this.interval) {clearInterval(this.interval);}
  }

  addFirstZero(num: number) : string {
    return num < 10 ? '0' + num : '' + num;
  }
}

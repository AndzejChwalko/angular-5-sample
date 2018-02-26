import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

import { HttpService } from './http.service';
import { DataService } from './data.service';
import { CachingInterceptor } from './cacheInterceptor';
import { SearchPipe } from './search.pipe';
import { HighlightPipe } from './highlight.pipe';
import { OrderByPipe } from './orderby.pipe';
import { GroupByPipe } from './groupby.pipe';
import { FirstLetterPipe } from './firstLetter.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StopsComponent } from './stops/stops.component';
import { StopDetailsComponent } from './stop-details/stop-details.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ClockComponent } from './clock/clock.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    StopsComponent,
    SearchPipe,
    HighlightPipe,
    OrderByPipe,
    GroupByPipe,
    FirstLetterPipe,
    StopDetailsComponent,
    TimetableComponent,
    ClockComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    AngularSvgIconModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
    DataService,
    HttpService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';  

@Injectable()
export class HttpService {

  private BASE_URL: string = 'http://ancient-savannah-99444.herokuapp.com';

  constructor(private httpClient: HttpClient) {  }

  doGet(url: string) : any {
    return this.httpClient.get(this.BASE_URL + url);
  }

}

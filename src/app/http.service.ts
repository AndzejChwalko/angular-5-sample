import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';  

@Injectable()
export class HttpService {

  private BASE_URL: string = 'http://ancient-savannah-99444.herokuapp.com';

  constructor(private httpClient: HttpClient) {  }

  doGet(url: string, params?: any) : any {
    let urlParams = new HttpParams({
      fromObject: params
    });
    return this.httpClient.get(this.BASE_URL + url, {params:urlParams});
  }

  doPost(url: string, body: object) : any {
    return this.httpClient.post(this.BASE_URL + url, body);
  }

}

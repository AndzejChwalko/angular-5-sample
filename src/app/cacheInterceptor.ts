import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
private cache = new Map<string, HttpResponse<any>>();

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        // continue if not cachable
        if (!this.isCachable(req)){
            return next.handle(req);
        }

        const cachedResponse = this.cache.get(req.urlWithParams);
        if (cachedResponse && !req.headers.get('disable-cache')){
            console.log(req.urlWithParams + ' has been loaded from cache');
            return Observable.of(cachedResponse.clone());
        }

        return next.handle(req).do(event => {
            if (event instanceof HttpResponse && !req.headers.get('disable-cache')){
                this.cache.set(req.urlWithParams, event.clone());
            }
        });
    }

    isCachable(req: HttpRequest<any>): boolean {
        return req.method.toUpperCase() === 'GET';
    }
}
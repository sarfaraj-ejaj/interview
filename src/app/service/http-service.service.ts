import { Injectable } from '@angular/core';
import { Observable, from , throwError } from 'rxjs';
import { Http, Headers,RequestOptions } from '@angular/http';
import { Platform } from '@ionic/angular';
import { map, catchError } from 'rxjs/operators';
import { config } from '../shared/config';
import { ProcessHttpService } from '../service/process-http.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  public headers: any;
  constructor(
    public platform: Platform,
    private http: Http,
    private processHttpmsgService: ProcessHttpService
  ) { }

  initializeHeader() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getRequest(url:any,param:any): Observable<any> {
    //this.initializeHeader();
    return this.http.get(config["baseURL"]+url+param,{ headers: this.headers })
        .pipe(map(res => {
          return this.processHttpmsgService.extractData(res)
        }),
          catchError((error) => {
            return throwError(error)
          }))
  }
}

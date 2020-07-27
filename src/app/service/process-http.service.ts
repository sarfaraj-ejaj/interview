import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpService {

  constructor(
    public platform: Platform
  ) { }

  public extractData(res: Response | any) {
    if (this.platform.is('mobileweb') || true) {
      let responseTemp = res;
      let responseData = JSON.parse(responseTemp['_body'])
      if (responseTemp['StatusCode'] == -1) {
        //this.utilitiesProvider.presentToastTop("Session expired!!!");
        // localStorage.setItem("tokenExpired", "Yes")
      }
      let body = res.json();
      return body || {};
    }
    else {
      let body = JSON.parse(res);
      if (body['StatusCode'] == -1) {
        //this.utilitiesProvider.presentToastTop("Session expired!!!");
        // localStorage.setItem("tokenExpired", "Yes")
      }
      return body || {};
    }

  }

  public handleError(error: Response | any){
    if (this.platform.is('mobileweb') || true) {
          let errMsg: string;
    if(error instanceof Response){
      // const body = error;
      if(error.status != 400){
        const body = error.json();
        const err = body['error'] || JSON.stringify(body)
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
      else{
        errMsg = "Bad request"
      }
    }
    else{
      if(error.status !=400){
      errMsg = error.message ? error.message : error.toString();
      }
      else{
        errMsg = error;
      }
    }
    console.log(errMsg)
    return throwError(errMsg)
    }
    else{
      return JSON.parse(error);
    }
  }
}

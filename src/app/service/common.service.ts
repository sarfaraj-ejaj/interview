import { Injectable } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  GoogleMapsEvent,
  LatLng,
  Geocoder,
  GeocoderResult,
} from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public geolocation: Geolocation,
  ) { }

  
  public nullValidate(loc: any, type?: string): any {
    if (loc == null || loc == undefined || loc == "") {
      return ""
    }
    else {
      if (type == 'end') {
        return loc;
      }
      else {
        return loc + ",";
      }
    }
  }

  /********** Common function for google map***********/

  /************Get current location (latitude,longitude)**************/
  getCurrentPosition() {
    let position: LatLng = new LatLng(21.7679, 78.8718);
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp);
        if (resp.coords.latitude != null && resp.coords.longitude != null) {
          let currPosition: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
          resolve({ position: currPosition, isError: false });
        }
        else {
          resolve({ position: position, isError: true });
        }
      }).catch((error) => {
        console.log(error);
        resolve({ position: position, isError: true });
      });
    });
  }

  /************ Convert position to address **************/
  getAddressFromPos(pos: any) {
    return new Promise((resolve, reject) => {
      Geocoder.geocode({ position: { "lat": pos.lat, "lng": pos.lng } }).then((results: GeocoderResult[]) => {
        if (!results.length) {
          resolve({ userloc: null });
        }
        resolve({ userloc: results[0] });
      });
    });
  }

  /************ Convert address to position **************/
  getPosFromAddress(locAddress?: any) {
    return new Promise((resolve, reject) => {
      Geocoder.geocode({ address: locAddress }).then((results: GeocoderResult[]) => {
        if (!results.length) {
          resolve({ userDtl: null });
        }
        resolve({ userDtl: results[0] });
      });
    });
  }
}

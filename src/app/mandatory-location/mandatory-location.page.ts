import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Router } from "@angular/router";
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-mandatory-location',
  templateUrl: './mandatory-location.page.html',
  styleUrls: ['./mandatory-location.page.scss'],
})
export class MandatoryLocationPage implements OnInit {

  constructor(
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private router: Router,
    private common: CommonService,
  ) { }

  ngOnInit() {
  }

  grantLocation(){
    this._getLocation();
  }

  enableGPS(){
    this._getLocation();
  }

  private _getLocation() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        
      }
    );
  }


  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.common.getCurrentPosition().then((data) => {
          this.router.navigate(['/home']);
        });
      },
      error => {
        //alert('Error requesting location permissions ' + JSON.stringify(error));
        //this.router.navigateByUrl("/login");
      }
    );
  }

}

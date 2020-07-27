import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonService } from './service/common.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/home/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/home/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/home/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/home/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/home/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/home/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public common: CommonService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    public router: Router
  ) {
    this.initializeApp();
    if(!this.platform.is('mobileweb')){
      this._getLocation();
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('home/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  /***************************************************/
  /****** Function :- getCurentLoc *******/
  /****** Decription:- get current location so that we can get farmers and sellers near by*******/
  /***************************************************/

  _getLocation() {

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
        this.router.navigateByUrl("/mandatory-location");
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        this.router.navigateByUrl("/mandatory-location");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            (res) => {
              if (res.hasPermission) {
                this.askToTurnOnGPS();
              }
              else {
                this.router.navigateByUrl("/mandatory-location");
              }
              // call method to turn on GPS

            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
              this.router.navigateByUrl("/mandatory-location");
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getCurrentLoc()
      },
      error => {
        //alert('Error requesting location permissions ' + JSON.stringify(error));
        this.router.navigateByUrl("/mandatory-location");
      }
    );
  }


  getCurrentLoc() {
    this.common.getCurrentPosition().then((data) => {
      if (!data["isError"]) {
        console.log(data["position"]);
        var currentPos = data["position"];
        this.common.getAddressFromPos(currentPos).then((data) => {
          console.log(data);
          var resp = data["userloc"];
          var displayLocation = this.common.nullValidate(resp["subLocality"]) + this.common.nullValidate(resp["locality"]) + this.common.nullValidate(resp["countryCode"], 'end')
          console.log(displayLocation);
          this.router.navigate(['/home/Inbox']);
        })
      }
      else {
        this.router.navigate(['/mandatory-location']);
      }
    });
  }
}

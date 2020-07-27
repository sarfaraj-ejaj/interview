import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../service/http-service.service';
import { config } from '../shared/config';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpServiceService,
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getWeatherReport('?q=London,uk&APPID='+config["appId"]);
  }

  getWeatherReport(param) {
    this.http.getRequest('2.5/weather',param)
      .subscribe(res => {
        console.log(res);
      },
        err => {
          console.log(err);
        });
  }

}

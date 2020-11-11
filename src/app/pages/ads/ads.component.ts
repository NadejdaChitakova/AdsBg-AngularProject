import { Ad } from './../../models/ad';
import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
})
export class AdsComponent implements OnInit {
  ads: Ad[];

  constructor(public adsService: AdsService) {
    //виж после
    this.adsService.adsSubject.subscribe((ads) => {
      console.log('updating component', ads);
      this.ads = ads;
    });
  }

  ngOnInit(): void {
    this.adsService.getAds();
  }
}

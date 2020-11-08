import { Ad } from './../../models/ad';
import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
})
export class AdsComponent implements OnInit {
  ads: Ad[];

  constructor(private adsService: AdsService) {}

  ngOnInit(): void {
    this.ads = this.adsService.getAds();
  }
}

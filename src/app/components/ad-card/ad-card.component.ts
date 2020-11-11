import { Component, Input, OnInit, Output } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { User } from 'src/app/models/user';
import { AdsService } from 'src/app/services/ads.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css'],
})
export class AdCardComponent implements OnInit {
  @Input() ad: Ad;
  constructor(private adsService: AdsService) {}

  ngOnInit(): void {}

  Like(): void {
    this.adsService.like(this.ad);
  }

  candidate(): void {
    this.adsService.addCandidate(this.ad);
  }
}

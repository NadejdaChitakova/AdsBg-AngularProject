import { Component, Input, OnInit, Output } from '@angular/core';
import { Ad } from 'src/app/models/ad';

@Component({
  selector: 'ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.css'],
})
export class AdCardComponent implements OnInit {
  @Input() ad: Ad;
  constructor() {}

  ngOnInit(): void {}

  Like(): void {
    this.ad.likes++;
  }
}

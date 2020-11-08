import { Injectable } from '@angular/core';
import { Ad, AdCategory, AdType } from '../models/ad';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  constructor() {}

  getAds() {
    return ADS;
  }
}

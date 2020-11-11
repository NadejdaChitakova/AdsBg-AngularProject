import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Ad, AdCategory, AdType } from '../models/ad';
import { User } from '../models/user';
import { AuthService, Roles } from './auth.service';

const ADS_URL = 'http://localhost:3000/ads';
const DEFAULT_ID = -1;

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  adsSubject = new Subject<Ad[]>();
  private _ads: Ad[];
  id: number = DEFAULT_ID;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.adsSubject.subscribe((ads) => (this._ads = ads));
  }

  getAds() {
    return this.http.get<Ad[]>(ADS_URL).subscribe((ads) => {
      ads.forEach((ad) => {
        if (this.id === DEFAULT_ID) this.id = ad.id;
        else if (ad.id > this.id) this.id = ad.id;
      });

      this.adsSubject.next(ads);
      console.log(this.id);
    });
  }

  createAd(
    title: string,
    description: string,
    type: AdType,
    category: AdCategory
  ) {
    if (this.id === DEFAULT_ID) {
      this.getAds();
    }

    let ad: Ad = {
      id: ++this.id,
      title,
      description,
      type,
      category,
      likes: [],
      appliedUsers: [],
    };

    console.log('creating ad', ad);

    this.http.post<Ad>(ADS_URL, ad, this.httpOptions).subscribe((ad) => {
      this.adsSubject.next([...this._ads, ad]);
    });
  }

  addCandidate(ad: Ad) {
    if (this.authService.role !== Roles.USER) return;

    ad.appliedUsers.push(this.authService.loggedInUser.id);

    this.http
      .put<Ad>(ADS_URL + `/${ad.id}`, ad, this.httpOptions)
      .subscribe((ad) => {
        let filteredAds = this._ads.filter((_ad) => _ad.id !== ad.id);
        this.adsSubject.next([ad, ...filteredAds]);
        console.log(ad);
      });
  }

  like(ad: Ad) {
    if (this.authService.role !== Roles.USER) return;

    ad.likes.push(this.authService.loggedInUser.id);
    this.http
      .put<Ad>(ADS_URL + `/${ad.id}`, ad, this.httpOptions)
      .subscribe((ad) => {
        debugger;
        let filteredAds = this._ads.filter((_ad) => _ad.id !== ad.id);
        this.adsSubject.next([ad, ...filteredAds]);
        console.log(ad);
      });
  }
}

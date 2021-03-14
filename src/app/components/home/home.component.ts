import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public idToken: string;
  public accessToken: string;
  public expiresIn: number;
  public currentUrl: string;
  
  constructor(
    private _route: ActivatedRoute
  ){
    this.currentUrl = window.location.href;
  }

  ngOnInit(): void {
    this._route.fragment
    .pipe(
      map(fragment => new URLSearchParams(fragment)),
      map(params => ({
        access_token: params.get('access_token'),
        id_token: params.get('id_token'),
        expires_in: params.get('expires_in'),
      }))
    )
    .subscribe(res => {
      this.accessToken = res.access_token;
      this.expiresIn = parseInt(res.expires_in);
      this.idToken = res.id_token;
    });
  }

}
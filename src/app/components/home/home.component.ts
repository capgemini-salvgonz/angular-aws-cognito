import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';

import { User } from '../../model/user.model';
import { UserService } from '../../service/users.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [UserService]
})
export class HomeComponent {
  public idToken: string;
  public accessToken: string;
  public expiresIn: number;
  public currentUrl: string;
  public user: User;
  
  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ){ }

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

    this._userService.getLoggedUser(this.idToken).subscribe(
      result => {
        console.log(result);
        this.user = result;
      },
      error => {
        console.log(error);
      }
    );

  }

}
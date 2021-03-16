import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private url: string = "http://localhost:8080/api/users";

  constructor (
    private _http: HttpClient
  ) { }
  
  getLoggedUser (tokenId: string) : Observable<User> {
    let loggedUserUrl = this.url + '/0';
    let authorization = 'Bearer ' + tokenId;
    let httpHeaders = new HttpHeaders({
      'Authorization': authorization,
      'Content-Type' : 'application/json'
    });

    return this._http.get(loggedUserUrl, {headers : httpHeaders}).pipe(
      map((response:any) => response as User)
    )
  }
}
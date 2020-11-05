import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, private api: ApiService) { }

  public isAuthenticated(): boolean {
    console.log(localStorage.getItem("adminToken"));
      if(localStorage.getItem("adminToken") == "null" || localStorage.getItem("adminToken") == "Bearer undefined") {
        return false;
      } else {
      return !this.jwtHelper.isTokenExpired(localStorage.getItem("adminToken"));
      }
  }
}

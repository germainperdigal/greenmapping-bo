import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ApiService } from '../services/api.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private api: ApiService) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  displayButtons(): boolean {
    if (!this.auth.isAuthenticated() || localStorage.getItem("adminToken") == "null" || localStorage.getItem("adminToken") == "Bearer undefined") {
      return false;
    } else {
      return true;
    }
  }

}

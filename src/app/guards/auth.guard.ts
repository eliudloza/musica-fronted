import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  googleAuthenticated: boolean;

  constructor( private router: Router, private authServiceGoogle: AuthService) {}

  dashboardGuard(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authServiceGoogle.authState.subscribe(user => {
        this.googleAuthenticated = (user != null);

        if (this.googleAuthenticated) {
          resolve(true);
        } else {
          this.router.navigate(['login']);

          resolve(false);
        }
      });
    });
  }
  authGuard(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authServiceGoogle.authState.subscribe(user => {
        this.googleAuthenticated = (user != null);

        if (this.googleAuthenticated) {
          this.router.navigate(['dashboard']);

          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (next.data.route == 'dashboard') {
      return this.dashboardGuard();
    }

    if(next.data.route == 'auth') {
      return this.authGuard();
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.dashboardGuard();
  }

}

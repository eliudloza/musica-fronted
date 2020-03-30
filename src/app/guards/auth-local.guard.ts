import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLocalGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router
  ) {}

  dashboardGuard(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['login']);

      return false;
    }
  }

  authGuard(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);

      return false;
    } else {
      return true;
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(next.data.route == 'dashboard') {
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

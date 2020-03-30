import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../../services/auth0.service';
import {AuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  loggedLocal: boolean;
  constructor(
    private authServiceGoogle: AuthService, public auth0: Auth0Service, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authServiceGoogle.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    if(localStorage.getItem('token')) {
      this.loggedLocal = true;
    } else {
      this.loggedLocal = false;
    }
  }
  signOut(): void {
    this.authServiceGoogle.signOut();
  }
  logOut(): void {
    this.authenticationService.logout();
  }
}

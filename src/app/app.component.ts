import { Component } from '@angular/core';
import {Auth0Service} from './services/auth0.service';
import {AuthService} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public auth0: Auth0Service, public authServiceGoogle: AuthService) {
  }
  title = 'fronted';
}

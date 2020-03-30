import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  constructor(private http: HttpClient, private router: Router) { this.readToken(); }

  login(data: any) {
    return this.http.post(environment.apiBaseURL + 'api/v1/user/login', data).pipe(
      map(respuesta => {
        this.token = respuesta['token'];
        localStorage.setItem('token', respuesta['token']);
        this.router.navigate(['dashboard']);
      })
    );
  }

  register(data: any) {
    return this.http.post(environment.apiBaseURL + 'api/v1/user/create', data);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isloggedin() {
    return this.token.length > 1;
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
    return this.token;
  }

}

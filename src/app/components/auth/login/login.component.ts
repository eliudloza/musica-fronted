import { Component, OnInit } from '@angular/core';
import {Auth0Service} from '../../../services/auth0.service';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;
  user: SocialUser;
  form: FormGroup;

  constructor(
    public auth0: Auth0Service,
    private authServiceGoogle: AuthService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'));

    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.authServiceGoogle.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  login() {
    if (this.form.valid) {
      this.authenticationService.login(this.form.value).subscribe();
    }
  }

  signInWithGoogle(): void {
    this.authServiceGoogle.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authServiceGoogle.signOut();
  }

}

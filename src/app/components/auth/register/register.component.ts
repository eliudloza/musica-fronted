import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user: User;
  constructor( private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      password2: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  get usernameValidate() {
    return (
      this.form.get("username").invalid && this.form.get("username").touched);
  }

  get emailValidate() {
    return this.form.get("email").invalid && this.form.get("email").touched;
  }

  get passwordValidate() {
    return (
      this.form.get("password").invalid && this.form.get("password").touched);
  }

  get passwordSecond() {
    const password = this.form.get("password").value;
    const password2 = this.form.get("password2").value;

    return password === password2 ? false : true;
  }

  register() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.user = this.form.value;
      this.authenticationService.register(this.user).subscribe(
        (data: any) => {
          this.router.navigate(['/login']);
        },
        err => {
        }
      );
    }
  }

}
  export interface User {
  username: String;
  password: String;
  email: String;
  }

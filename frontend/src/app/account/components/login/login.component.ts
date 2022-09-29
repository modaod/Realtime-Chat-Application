import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName!: FormControl;
  password!: FormControl;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.userName = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  onLogin() {
    this.authService.login(this.userName.value, this.password.value);
    this.router.navigateByUrl('home');
  }
}

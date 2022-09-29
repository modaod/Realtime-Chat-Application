import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userName!: FormControl;
  email!: FormControl;
  password!: FormControl;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor() { }

  ngOnInit(): void {
    this.userName = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
      ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.regexp),
    ]);
    this.password = new FormControl('', Validators.required);

  }

  onRegister() {

  }
}

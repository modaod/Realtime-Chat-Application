import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AccountRoutingModule} from "./account-routing.module";
import {CoreModule} from "../core/core.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }

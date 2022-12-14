import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import {httpInterceptorProvider} from "./auth/interceptors";
import {AuthModule} from "./auth/auth.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AccountModule} from "./account/account.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    AccountModule,
    NgbModule
  ],
  providers: [
    httpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

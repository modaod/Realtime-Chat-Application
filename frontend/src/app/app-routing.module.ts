import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/guards/auth.guard";

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./session/session.module').then(m => m.SessionModule), canActivate: [AuthGuard] },
  { path: 'auth',  loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

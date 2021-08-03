import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/auth/home/home.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {AuthenticService} from './services/authentic.service';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"user-list",component:UserListComponent,canActivate:[AuthenticService]},
  {path:"user-profile",component:UserProfileComponent,canActivate:[AuthenticService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

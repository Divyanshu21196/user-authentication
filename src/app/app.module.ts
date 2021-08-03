import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS,HttpClient,HttpClientJsonpModule } from '@angular/common/http';
import { HomeComponent } from './components/auth/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import {AuthApiService} from './services/auth-api.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UserListComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [HttpClient,AuthApiService] ,
  bootstrap: [AppComponent]
})
export class AppModule { }

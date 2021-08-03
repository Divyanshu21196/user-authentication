import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpClientJsonpModule } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthenticService} from './authentic.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient,private auth:AuthenticService) { }

  login = (requestData) =>{
    return this.http.post(this.baseUrl + 'userLogin',requestData)
  }

  signup = (requestData) =>{
    // console.log(requestData)
    return this.http.post(this.baseUrl + 'userSignup',requestData)
  }

  getProfileInfo = () =>{
    return this.http.get(this.baseUrl + 'getProfile',this.auth.formheader())
  }

  updateProfile = (requestData) =>{
    return this.http.post(this.baseUrl + 'updateProfile',requestData)
  }
}

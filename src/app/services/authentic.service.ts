import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpClientJsonpModule } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticService {
  authkey = '';
  token:any;
  keyUser= 'user';
  constructor(private http:HttpClient,public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {  
    if (this.ifAuthenticated()) {
        return true;
    } 
    this.router.navigate(['/']); 
    return false;
 }

 
 public ifAuthenticated() {
  let data: string = this.loadUser();
  // console.log(`${data}`);
  let loggedIn: boolean = false;
  
  if (data !== null) {
      try {
          if (!data['token']) {
            
  //  console.log('=========here');
            return false;
          }
          loggedIn = (this.getUser() != null);
      } catch (e) {
          console.error(e);
      }
  }            
  return loggedIn;
}

public loadUser() { 
  try {            
      let storedData: string = localStorage.getItem(this.keyUser);
      if (!storedData) { throw Error('no user data found'); }
      return JSON.parse(storedData);
  } catch (e) { }
  return null;
  }

  getUser(): any {
    try {
        return JSON.parse(localStorage.getItem(this.keyUser));
    } catch (e) { }
    return null;
  }

  public saveLoginUserData(userData: Object) {
    localStorage.setItem(this.keyUser, JSON.stringify(userData));
  }

  public formheader() {
    let userData = this.loadUser();
    if(userData){
      this.token = userData.token;
    }
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    header = header.append('token', this.token);
    return { headers: header};
  }

}

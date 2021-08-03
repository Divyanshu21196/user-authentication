import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import {AuthApiService} from '../../../services/auth-api.service';
import {AuthenticService} from '../../../services/authentic.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  form: FormGroup;

  constructor(private fb: FormBuilder,private auth:AuthApiService,private local:AuthenticService,private router:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["",[Validators.required]],
    });
  }


  get f (){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }

    let data = {'email':this.f.email.value,'password':this.f.password.value};
    this.auth.login(data).subscribe((respnse:any)=>{
      console.log("=========",respnse);
      alert(respnse.msg);
      this.local.saveLoginUserData(respnse.data);
      this.router.navigate(['/user-profile'])
    },(e)=>{
      alert(e.error.msg);
    })
  }

}

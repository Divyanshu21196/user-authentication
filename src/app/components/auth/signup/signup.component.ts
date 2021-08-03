import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import {AuthApiService} from '../../../services/auth-api.service';
import {AuthenticService} from '../../../services/authentic.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  profileData:any;
  constructor(private fb: FormBuilder,private auth:AuthApiService,private local:AuthenticService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["",[Validators.required]],
      name:[""],
      phone:[''],
      mobile:[''],
      zipcode:['',[Validators.required]],
      lat:['',[Validators.required]],
      lng:['',[Validators.required]],
      profilepic:[this.profileData]
    });
  }

  
  get f (){
    return this.form.controls;
  }

  preview(files:any) {
    if (files.length === 0) {
      return;
    }

    this.f['profilepic'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.profileData = <File>files[0];
    reader.readAsDataURL(files[0]);
  }

  submit(){
    this.submitted = true;
    // if(this.form.invalid){
    //   return;
    // }

    const formData =  new FormData();

    formData.append('name',this.f.name.value);
    formData.append('email',this.f.email.value);
    formData.append('password',this.f.password.value);
    formData.append('phone',this.f.phone.value);
    formData.append('mobile',this.f.mobile.value);
    formData.append('zipcode',this.f.zipcode.value);
    formData.append('image',this.profileData);
    formData.append('lat',this.f.lat.value);
    formData.append('lng',this.f.lng.value);

    // let data = {'name':this.f.name.value}

    this.auth.signup(formData).subscribe((response:any)=>{
      alert('success');
      this.submitted = false;
      this.form.reset();
    },(e)=>{
      alert(e.error.msg);
    })
  }

}

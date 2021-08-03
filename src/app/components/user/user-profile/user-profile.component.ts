import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import {AuthApiService} from '../../../services/auth-api.service';
import {AuthenticService} from '../../../services/authentic.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  profileData:any;

  constructor(private fb: FormBuilder,private auth:AuthApiService,private local:AuthenticService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      name:[""],
      phone:[''],
      mobile:[''],
      zipcode:['',[Validators.required]],
      profilepic:[this.profileData]
    });

    this.getProfileData();
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


  getProfileData(){
    // console.log(token)
    this.auth.getProfileInfo().subscribe((response:any)=>{ 
      console.log("=======.",response); 
      this.form.setValue({'email':response.data.email,'name':response.data.name,'phone':response.data.phone,'mobile':response.data.mobile,'zipcode':response.data.zipcode,'profilepic':''})
    })
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }

    const formData =  new FormData();

    formData.append('name',this.f.name.value);
    formData.append('email',this.f.email.value);
    formData.append('password',this.f.password.value);
    formData.append('phone',this.f.phone.value);
    formData.append('mobile',this.f.mobile.value);
    formData.append('zipcode',this.f.zipcode.value);
    formData.append('profilePic',this.profileData);

    this.auth.updateProfile(formData).subscribe((response:any)=>{
      alert('success');
      this.form.reset();
    },(e)=>{
      alert(e.error.message);
    })

  }
} 

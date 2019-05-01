import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {SignupData} from '../auth.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  signupData: SignupData;
  authStatus: Subscription;
  isLoading = false;

  constructor(private authService:AuthService) { }

  ngOnInit(){
    this.signupForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, Validators.required),
        'image': new FormControl(null),
        'phone': new FormControl(null)
    });

    this.authStatus = this.authService.getAuthStatusListener().subscribe(
      status=>{
        this.isLoading = false;
      }
    )
  }

  onSubmit(){
    if(!this.signupForm.valid){
      this.signupForm.reset()
    }else{
      this.signupData = {
        name:this.signupForm.value.name,
        email:this.signupForm.value.email,
        phone:this.signupForm.value.phone,
        password:this.signupForm.value.password,
        image:this.signupForm.value.image,
      }
      this.isLoading = true;
      this.authService.signup(this.signupData);
    }
  }

  ngOnDestroy(){
    this.authStatus.unsubscribe()
  }

}



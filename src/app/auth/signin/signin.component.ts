import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import {LoginData} from '../auth.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit, OnDestroy {
    signinForm: FormGroup;
    signinData: LoginData;
    authStatus: Subscription;
    isLoading = false;

    constructor(private authService: AuthService){}

    ngOnInit(){
        this.signinForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required)
        });
    
        this.authStatus = this.authService.getAuthStatusListener().subscribe(
            authStatus =>{
                this.isLoading = false;
            }
        );
    }

    onSubmit(){
        if(!this.signinForm.valid){
            this.signinForm.reset()
          }else{
            this.signinData = {
              email:this.signinForm.value.email,
              password:this.signinForm.value.password
            }
            this.isLoading = true;
            this.authService.signin(this.signinData);
          }
    }

    ngOnDestroy(){
        this.authStatus.unsubscribe();
    }

}
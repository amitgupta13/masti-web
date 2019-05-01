import { HttpClient } from '@angular/common/http';
import { LoginData, SignupData } from './auth.model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const BACKEND_URL = environment.authApi;

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http:HttpClient, private router: Router){}

    signup(signupData: SignupData){
        this.http.post<{token:string, userId:string}>(`${BACKEND_URL}/signup`, signupData)
            .subscribe((data)=>{
                this.isAuthenticated = true;
                this.token = data.token;
                this.userId = data.userId;
                this.authStatusListener.next(true);
                this.saveAuthData(this.token, this.userId);
                this.router.navigate(['/']);
            }, error=>{
                this.authStatusListener.next(false);
            });
    }

    signin(signinData: LoginData){
        this.http.post<{token:string, userId:string}>(`${BACKEND_URL}/signin`, signinData)
            .subscribe((data)=>{
                this.isAuthenticated = true;
                this.token = data.token;
                this.userId = data.userId;
                this.authStatusListener.next(true);
                this.saveAuthData(this.token, this.userId);
                this.router.navigate(['/']);
            }, error=>{
                this.authStatusListener.next(false);
            });
    }

    private saveAuthData(token:string, userId:string){
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    }

    private clearAuthdata(){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        this.clearAuthdata();
        this.router.navigate(['/']);
    }

}
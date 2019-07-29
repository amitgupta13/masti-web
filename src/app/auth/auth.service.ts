import { HttpClient } from "@angular/common/http";
import { LoginData, SignupData } from "./auth.model";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { text } from "@angular/core/src/render3";

const BACKEND_URL = environment.authApi;

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signup(signupData: SignupData) {
    this.http
      .post(`${BACKEND_URL}/signup`, signupData, { responseType: "text" })
      .subscribe(
        token => {
          this.isAuthenticated = true;
          this.token = token;
          this.authStatusListener.next(true);
          this.saveAuthData(this.token);
          this.router.navigate(["/"]);
          this.toastr.success("Signup Successful");
        },
        error => {
          this.authStatusListener.next(false);
          this.toastr.error(error.error);
        }
      );
  }

  signin(signinData: LoginData) {
    this.http
      .post(`${BACKEND_URL}/signin`, signinData, { responseType: "text" })
      .subscribe(
        token => {
          this.isAuthenticated = true;
          this.token = token;
          this.authStatusListener.next(true);
          this.saveAuthData(this.token);
          this.router.navigate(["/"]);
          this.toastr.success("Successfully Logged In");
        },
        error => {
          this.authStatusListener.next(false);
          this.toastr.error(error.error);
        }
      );
  }

  private saveAuthData(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return this.token;
  }

  private clearAuthdata() {
    localStorage.removeItem("token");
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const token = this.getAuthData();
    if (!token) return;
    this.token = token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  getAuthData() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return token;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthdata();
    this.router.navigate(["/"]);
    this.toastr.success("Logged out successfully");
  }
}

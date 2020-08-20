import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser, IUserSignin, IUserSignup, IUserResponse } from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  withCredentials: true,
  observe: "response" as "response",
};

@Injectable({
  providedIn: "root",
})
export class SignService {
  environment;
  constructor(private router: Router, private http: HttpClient) {}
  user: IUser;
  error: Error;
  loading: boolean = false;
  signInAction(user: IUserSignin) {
    this.user = null;
    this.error = null;
    this.loading = true;
    this.http
      .post<IUserResponse>(environment.server_url + "signin", user, httpOptions)
      .subscribe(
        (data) => {
          const { body } = data;
          if (body.user) {
            this.user = body.user;
            this.router.navigateByUrl("/chat");
          }
          if (body.error) {
            this.error = body.error;
          }
          if (data["error"]) {
            this.error = data["error"];
          }
        },
        (err) => (this.error = err),
        () => {
          this.loading = false;
        }
      );
  }
  signUpAction(user: IUserSignup) {
    this.user = null;
    this.error = null;
    this.loading = true;
    this.http
      .post<IUserResponse>(environment.server_url + "signup", user, httpOptions)
      .subscribe(
        (data) => {
          const { body } = data;
          if (body.user) {
            this.user = body.user;
            this.router.navigateByUrl("/chat");
          }
          if (body.error) {
            this.error = body.error;
          }
          if (data["error"]) {
            this.error = data["error"];
          }
        },
        (err) => (this.error = err),
        () => {
          this.loading = false;
        }
      );
  }
}

import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class SignService {
  environment;
  constructor(private router: Router, private http: HttpClient) {}
  user: IUser;
  error: Error;
  loading: boolean = false;
  signInAction(user: IUser) {
    this.user = null;
    this.error = null;
    this.loading = true;
    this.http
      .post<IUser>(environment.server_url + "signin", user, {
        withCredentials: true
      })
      .subscribe(
        data => {
          if (data["user"]) {
            this.user = data["user"];
            this.router.navigateByUrl("chat");
          }
          if (data["error"]) {
            this.error = data["error"];
          }
        },
        err => (this.error = err),
        () => {
          this.loading = false;
        }
      );
  }
  signUpAction(user: IUser) {
    this.user = null;
    this.error = null;
    this.loading = true;
    this.http
      .post<IUser>(environment.server_url + "signup", user, {
        withCredentials: true
      })
      .subscribe(
        data => {
          if (data["user"]) {
            this.user = data["user"];
            this.router.navigateByUrl("chat");
          }
          if (data["error"]) {
            this.error = data["error"];
          }
        },
        err => (this.error = err),
        () => {
          this.loading = false;
        }
      );
  }
}

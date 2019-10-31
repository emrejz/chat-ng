import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class SignService {
  constructor(private router: Router, private http: HttpClient) {}
  user: IUser;
  error: Error;
  signInAction(user: IUser) {
    this.user = null;
    this.error = null;
    this.http
      .post<IUser>("http://localhost:3001/signin", user, {
        withCredentials: true
      })
      .subscribe(
        data => {
          if (data["user"]) {
            this.user = data["user"];
          }
          if (data["error"]) {
            this.error = data["error"];
          }
        },
        err => (this.error = err)
      );
  }

  signUpAction(user: IUser) {
    this.user = null;
    this.error = null;
    this.http
      .post<IUser>("http://localhost:3001/signup", user, {
        withCredentials: true
      })
      .subscribe(
        data => {
          if (data["user"]) {
            this.user = data["user"];
          }
          if (data["error"]) {
            this.error = data["error"];
          }
        },
        err => (this.error = err)
      );
  }
}

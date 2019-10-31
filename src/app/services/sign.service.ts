import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class SignService {
  constructor(private router: Router, private http: HttpClient) {}
  user: User;
  error: Error;
  signInAction(user) {
    this.http
      .post<User>("http://localhost:3001/signin", user, {
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
  signUpAction(user) {
    this.http
      .post<User>("http://localhost:3001/signup", user, {
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

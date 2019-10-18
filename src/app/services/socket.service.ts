import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  constructor(private http: HttpClient) {}
  onlineUser: Array<{ username: string; picture: string }> = [];
  private socket = io("http://localhost:3001/");
  join(data) {
    this.socket.emit("local", data);
    this.socket.on("onlineList", data => {
      this.onlineUser = data;
    });
    this.socket.on("wrong username", () => console.log("Wrong username!"));
    this.socket.on("wrong password", () => console.log("Wrong paswword!"));
    this.socket.on("service error", () => console.log("Service error!"));
  }
  signUp(username, password) {
    const requestOptions = {
      withCredentials: true
    };
    this.http
      .post(
        "http://localhost:3001/signup",
        {
          username,
          password
        },
        requestOptions
      )
      .subscribe(data => console.log(data));
  }
  getUser() {
    const requestOptions = {
      withCredentials: true
    };
    this.http
      .get("http://localhost:3001/getuser", requestOptions)
      .subscribe(data => console.log(data));
  }
  // onlineUser() {
  //   return new Observable<{ username: string; picture: string }[]>(observer => {
  //     this.socket.on("onlineList", data => {
  //       console.log(data);
  //       console.log(observer);
  //       observer.next(data);
  //     });
  //     return this.socket;
  //   });
  // }
}

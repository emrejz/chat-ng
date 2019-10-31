import { Room } from "./../models/room";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  constructor(private http: HttpClient) {}
  onlineUser: Array<{ username: string; picture: string }> = [];
  socket = io("http://localhost:3001/").emit("startEvent");

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
  disconnectScoke() {
    this.socket.disconnect();
  }
  roomList(): Observable<Room[]> {
    return new Observable(observer => {
      this.socket.on("roomList", data => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
  }
  newRoom(): Observable<Room> {
    return new Observable(observer => {
      this.socket.on("newRoom", data => {
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
  }
  addRoom() {
    this.socket.emit(
      "addRoom",
      Math.random()
        .toString(36)
        .substring(10)
    );
  }
  getUser() {
    this.socket.disconnect();
    this.socket = io("http://localhost:3001/").emit("startEvent");
    console.log(this.socket);
    // const requestOptions = {
    //   withCredentials: true
    // };
    // this.http
    //   .get("http://localhost:3001", requestOptions)
    //   .subscribe(data => console.log(data));
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
  join(data) {
    this.socket.emit("local", data);
    this.socket.on("onlineList", data => {
      this.onlineUser = data;
    });
    this.socket.on("wrong username", () => console.log("Wrong username!"));
    this.socket.on("wrong password", () => console.log("Wrong paswword!"));
    this.socket.on("service error", () => console.log("Service error!"));
  }
}

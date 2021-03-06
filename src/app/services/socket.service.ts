import { IUser } from "./../models/user";
import { Router } from "@angular/router";
import { IRoom } from "./../models/room";
import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(private router: Router) {}
  socket: any;
  user: IUser;
  roomList: IRoom[];
  onlineUserList: IUser[];
  messageList: object = {};
  selectedRoom: IRoom = { name: "a", when: null };
  loading: boolean = true;
  destroy() {
    this.socket.disconnect();
    this.user = undefined;
  }
  socketInitFunc() {
    this.socket = io(environment.server_url, {
      transports: ["websocket"],
    }).emit("startEvent");
    this.user = undefined;
    this.socket.on("userInfo", (data) => {
      this.loading = false;
      if (data.logged_in === false) {
        this.router.navigateByUrl("sign");
        this.user = data;
      } else if (data.username) {
        this.router.navigateByUrl("chat");
        this.user = data;
      } else this.router.navigateByUrl("sign");
    });
    this.socket.on("roomList", (data) => {
      this.roomList = data;
    });
    this.socket.on("onlineList", (data) => {
      this.onlineUserList = data;
    });
    this.socket.on("newRoom", (data) => {
      this.roomList.push(data);
    });
    this.socket.on("roomMesasges", (data) => {
      this.messageList = { ...this.messageList, ...data };
    });
    this.socket.on("newMessage", (data) => {
      const {
        roomName,
        message,
        user: { username, picture },
        when,
      } = data;
      this.messageList[roomName].push({ username, message, when, picture });
    });
    this.socket.emit("roomMessages", "a");
  }
  getRoomMessages(roomName: string) {
    this.selectedRoom.name = roomName;
    this.socket.emit("roomMessages", roomName);
  }
  getSelectedRoomMessages() {
    return this.messageList[this.selectedRoom.name];
  }
  newMessage(message: string) {
    this.socket.emit("newMessage", message);
  }
  addRoom(roomName: string) {
    this.socket.emit("addRoom", roomName);
  }
}

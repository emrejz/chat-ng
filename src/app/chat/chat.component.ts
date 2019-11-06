import { SocketService } from "./../services/socket.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = "";
  roomName: string = "deneme1";
  selectedRoom: boolean = true;
  addRoomName: string = "";
  colors: Array<string> = [
    "azure",
    "yellow",
    "aquamarine",
    "salmon",
    "antiquewhite",
    "lawngreen",
    "darkorange",
    "hotpink"
  ];
  userList: Array<string> = [];
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    if (!this.socketService.user) this.socketService.socketInitFunc();
    this.socketService.getRoomMessages(this.roomName);
  }
  ngOnDestroy() {
    this.socketService.destroy();
  }
  sendMsg() {
    if (this.message.trim().length > 0) {
      this.socketService.newMessage(this.message);
    }
    this.message = "";
  }
  getColor(item) {
    const { username } = item;
    if (this.userList.indexOf(username) < 0) {
      this.userList.push(username);
    }
    return this.colors[this.userList.indexOf(username)];
  }
  selectedRoomFunc(val: boolean) {
    this.selectedRoom = val;
  }
  addRoomNameFunc() {
    this.addRoomName = this.addRoomName.trim();
    if (this.addRoomName.length > 0) {
      this.socketService.addRoom(this.addRoomName);
    }
  }
  get roomList() {
    return this.socketService.roomList;
  }
  get onlineUsers() {
    return this.socketService.onlineUserList;
  }
  get roomMessages() {
    return this.socketService.messageList[this.roomName];
  }
  getRoomMsgs(name: string) {
    this.roomName = name;
    this.socketService.getRoomMessages(name);
  }
}

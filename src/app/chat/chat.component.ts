import { SocketService } from "./../services/socket.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = "";
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
  get roomMessages() {
    return this.socketService.getSelectedRoomMessages();
  }
  get roomName() {
    return this.socketService.selectedRoom.name;
  }
}

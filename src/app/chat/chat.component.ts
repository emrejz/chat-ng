import { SocketService } from "./../services/socket.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string;
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    if (!this.socketService.user) this.socketService.socketInitFunc();
  }
  ngOnDestroy() {
    this.socketService.destroy();
  }
  showD() {
    console.log(this.socketService.roomList);
    console.log(this.socketService.user);
    console.log(this.socketService.messageList);
  }
  newMsg() {
    console.log(this.message);
    this.socketService.newMessage(this.message);
  }
  addRoom() {
    this.socketService.addRoom();
  }
  getRoomMsgs(name: string) {
    this.socketService.getRoomMessages(name);
  }
  get roomList() {
    return this.socketService.roomList;
  }
}

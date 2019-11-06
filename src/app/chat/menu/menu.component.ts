import { SocketService } from "./../../services/socket.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  selectedRoom: boolean = true;
  addRoomName: string = "";
  constructor(private socketService: SocketService) {}
  ngOnInit() {}
  selectedRoomFunc(val: boolean) {
    this.selectedRoom = val;
  }
  addRoomNameFunc() {
    this.addRoomName = this.addRoomName.trim();
    if (this.addRoomName.length > 0) {
      this.socketService.addRoom(this.addRoomName);
    }
  }
  getRoomMsgs(name: string) {
    this.socketService.getRoomMessages(name);
  }
  get roomList() {
    return this.socketService.roomList;
  }
  get onlineUsers() {
    return this.socketService.onlineUserList;
  }
}

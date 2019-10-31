import { Observable } from "rxjs";
import { SignService } from "./../services/sign.service";
import { SocketService } from "./../services/socket.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Room } from "../models/room";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [SignService]
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private signService: SignService
  ) {}
  roomList: Room[];
  loginForm: FormGroup;
  onlineUser: Array<{ username: string; picture: string }> = [];
  connection: any;
  ngOnInit() {
    this.createForm();
    this.connection = this.socketService.roomList().subscribe(data => {
      this.roomList = data;
    });
    this.socketService.newRoom().subscribe(data => {
      this.roomList.push(data);
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  loginFunc() {
    this.signService.signInAction({ username: "emre", password: "123" });
  }
  discSocket() {
    this.socketService.disconnectScoke();
  }
  getUser() {
    this.socketService.getUser();
  }
  getSocket() {
    console.log(this.signService.error);
    console.log(this.signService.user);
    console.log(this.socketService.socket);
  }
  addRoom() {
    this.socketService.addRoom();
  }
  data() {
    console.log(this.roomList);
  }
  // this.socketService.join({
  //   username: this.loginForm.get("username").value,
  //   picture: this.loginForm.get("password").value
  // });

  // get onlineUser() {
  //   console.log(this.socketService.onlineUser);
  //   return this.socketService.onlineUser;
  // }
}

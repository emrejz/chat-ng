import { SocketService } from "./../services/socket.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService
  ) {}
  loginForm: FormGroup;
  onlineUser: Array<{ username: string; picture: string }> = [];
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  loginFunc() {
    this.socketService.signUp(this.loginForm.get("username").value, "123");
  }
  getUser() {
    this.socketService.getUser();
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

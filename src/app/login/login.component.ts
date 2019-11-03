import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { SignService } from "./../services/sign.service";
import { SocketService } from "./../services/socket.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.socketService.destroy();
  }
  constructor(
    private formBuilder: FormBuilder,
    private signService: SignService,
    private socketService: SocketService,
    private router: Router
  ) {}
  isSignIn: boolean = false;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  ngOnInit() {
    this.createSignInForm();
    this.createSignUpForm();
    if (!this.socketService.user) this.socketService.socketInitFunc();
    else {
      this.router.navigateByUrl("chat");
    }
  }
  get loading() {
    return this.signService.loading;
  }
  get error() {
    return this.signService.error;
  }
  signIn() {
    if (this.signInForm.valid) {
      this.signService.signInAction(this.signInForm.value);
    }
  }
  signUp() {
    if (this.signUpForm.valid) {
      this.signService.signUpAction(this.signUpForm.value);
    }
  }
  isSignInFunc(val: boolean) {
    this.isSignIn = val;
    this.signService.error = null;
  }
  createSignInForm() {
    this.signInForm = this.formBuilder.group({
      username: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
      ],
      password: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
      ]
    });
  }
  createSignUpForm() {
    this.signUpForm = this.formBuilder.group(
      {
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10)
          ]
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10)
          ]
        ],
        passwordC: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10)
          ]
        ]
      },
      {
        validator: this.passwordMatchValidator
      }
    );
  }
  passwordMatchValidator(g: FormGroup) {
    g.get("password").value !== g.get("passwordC").value &&
      g.get("passwordC").setErrors({ mismatch: true });
  }
}

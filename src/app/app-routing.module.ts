import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "sign", component: LoginComponent },
  { path: "chat", component: ChatComponent },
  { path: "**", redirectTo: "chat", pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

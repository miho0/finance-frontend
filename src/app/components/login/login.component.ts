import { Component, OnInit } from '@angular/core';
import {LoginDto} from "../../interfaces/LoginDto";
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../forms.scss']
})
export class LoginComponent implements OnInit {

  public loginInfo: LoginDto

  constructor(private backend: BackendService, private router: Router) {
    this.loginInfo = {username: "", password: ""};
  }

  ngOnInit(): void {
  }

  public buttonPressed = () => {
    this.backend.login(this.loginInfo).subscribe(
      (res) => {
        if (res.status === "success") {
          console.log(res)
          this.router.navigate(['/']);
        } else {
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

}

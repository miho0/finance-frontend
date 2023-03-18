import { Component, OnInit } from '@angular/core';
import {RegisterDto} from "../../interfaces/RegisterDto";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../forms.scss']
})
export class RegisterComponent implements OnInit {

  public registerInfo: RegisterDto;
  public repeatPass: string = "";

  constructor(private backend: BackendService) {
    this.registerInfo = {username: "", password: "", email: ""};
  }

  ngOnInit(): void {
  }

  public buttonPressed = () => {
    this.backend.register(this.registerInfo).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}

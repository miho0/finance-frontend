import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public currUser: string = "";

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  public getLoggedUser = () => {
    this.backend.currentUser().subscribe(
      (res) => {
        console.log(res)
        if (res.status === "success") {
          this.currUser = res.message;
        } else {
          this.currUser = "";
        }
      }
    )
  }
}



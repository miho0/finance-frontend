import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {BackendService} from "../../services/backend.service";
import {Message} from "../../interfaces/Message";

interface Route {
  name: string;
  route: string;
  active: boolean;
  condition?: () => boolean;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentUser = "";

  constructor(private location: Location, private backend: BackendService) { }

  public leftRoutes: Route[] = [
    {name: "HOME", route: "/", active: true},
    {name: "CATEGORIES", route: "/categories", active: false},
    {name: "TRANSACTIONS", route: "/transactions", active: false},
    {name: "STATISTICS", route: "/charts", active: false},
  ]

  public rightRoutes: Route[] = [
    {name: "LOGIN", route: "/login", active: false, condition: () => this.currentUser === ''},
    {name: "REGISTER", route: "/register", active: false, condition: () => this.currentUser === ''},
    {name: "LOGOUT", route: "/", active: false, condition: () => this.currentUser != ''},
  ]

  ngOnInit(): void {
    const path: String = this.location.path()
    if (path.split('/').length === 1) {
      this.changeActive(this.leftRoutes[0]);
    }
    this.leftRoutes.forEach((route, index) => {
      if (index != 0) {
        if (path.includes(route.route)) {
          this.changeActive(route);
          return;
        }
      }
    })
    this.rightRoutes.forEach(route => {
      if (path.includes(route.route) && route.name != "LOGOUT") {
        this.changeActive(route);
        return;
      }
    })
    this.getCurrentUser();
  }

  public changeActive(route: Route) {
    this.leftRoutes.forEach(r2 => {
      r2.active = route.name === r2.name;
    })
    this.rightRoutes.forEach(r2 => {
      r2.active = route.name === r2.name;
    });
    console.log(route.name)
    if (route.name === "LOGOUT") {
      this.backend.logout();
      window.location.reload();
    }
  }

  public getCurrentUser() {
    this.backend.currentUser().subscribe(
      (res: Message) => {
        if (res.status === "success") {
          this.currentUser = res.message;
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }
}

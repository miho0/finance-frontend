import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface Route {
  name: string;
  route: string;
  active: boolean;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private location: Location) { }

  public routes: Route[] = [
    {name: "HOME", route: "/", active: true},
    {name: "CATEGORIES", route: "/categories", active: false},
    {name: "TRANSACTIONS", route: "/transactions", active: false},
    {name: "STATISTICS", route: "/charts", active: false}
  ]

  ngOnInit(): void {
    const path: String = this.location.path()
    this.routes.forEach(route => {
      if (path.includes(route.route)) {
        this.changeActive(route);
        return;
      }
    })
  }

  public changeActive(route: Route) {
    this.routes.forEach(route => {
      route.active = false;
    })
    route.active = true;
  }

}

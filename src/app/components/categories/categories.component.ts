import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {CategoryExtra} from "../../interfaces/CategoryExtra";
import {Router} from "@angular/router";
import {Category} from "../../interfaces/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public allCategories: CategoryExtra[] = [];
  displayedColumns: string[] = ['name', 'total', 'percentage', 'numTransactions', 'delete'];

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories = () => {
    this.backend.getAllCategoriesExtra().subscribe(
      (res) => {
        this.allCategories = res;
        console.log(res)
      },
      (err) => {
        console.log(err);
      }
    )
  }

  public goToCategory(name: any) {
    console.log(name.name)
    this.router.navigate([`categories/${name.name}`]);
  }

  public deleteCategory = (element: any, event: Event) => {
    event.stopPropagation();
    this.backend.deleteCategory(element.name);
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "../../services/backend.service";
import {Category} from "../../interfaces/Category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public name: string = "";
  public labels: string[] = [];
  public chartData: number[] = [];

  public category?: Category;

  constructor(private route: ActivatedRoute, private backend: BackendService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];
    })

    this.backend.getTransactionsByMonth(this.name).subscribe(
      (res) => {
        this.labels = [];
        res.forEach(month => {
          this.labels.push(month.month);
          this.chartData.push(month.amount);
        })
      },
    (err) => {
      console.log(err)
    })

    this.backend.getCategoryByName(this.name).subscribe(
      (res) => {
        this.category = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}

// TODO filter

import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../interfaces/Transaction";
import {Category} from "../../interfaces/Category";
import {BackendService} from "../../services/backend.service";
import {allowMangle} from "@angular-devkit/build-angular/src/utils/environment-options";

@Component({
  selector: 'app-chart-board',
  templateUrl: './chart-board.component.html',
  styleUrls: ['./chart-board.component.scss']
})
export class ChartBoardComponent implements OnInit {

  constructor(private backend: BackendService) { }

  public startDate?: Date;
  public endDate?: Date;

  private allTransactions: Transaction[] = [];
  public allCategories: Category[] = [];

  public selectedTransactions: Transaction[] = [];

  public isLoading = true;

  ngOnInit(): void {
    this.backend.getAllCategories().subscribe(
      (res) => {
        this.allCategories = res;
        this.selectionChanged();
      },
      (err) => {
        console.log(err);
      }
    )

    const sd = localStorage.getItem("startDate");
    if (sd) {
      this.startDate = new Date(sd)
    }

    const ed = localStorage.getItem("endDate");
    if (ed) {
      this.endDate = new Date(ed)
    }

    if (ed || sd) {
      this.selectionChanged();
      this.isLoading = false;
    }

    else {
      this.backend.getAllTransactions().subscribe(
        (res) => {
          this.allTransactions = res;
          this.isLoading = false;
          this.selectedTransactions = this.allTransactions;
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  public selectionChanged() {
    if (this.startDate || this.endDate) {
      this.backend.getAllTransactionsFiltered(this.startDate, this.endDate).subscribe(
        (res) => {
          this.selectedTransactions = res;
          console.log(res)
        },
        (err) => {
          console.log(err);
        }
      )
      if (this.startDate) {
        localStorage.setItem("startDate", this.startDate.toJSON());
      }

      if (this.endDate) {
        localStorage.setItem("endDate", this.endDate.toJSON());
      }

    } else {
      this.selectedTransactions = this.allTransactions;
    }
  }
}

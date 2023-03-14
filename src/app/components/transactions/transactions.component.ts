import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../interfaces/Transaction";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  private allTransactions: Transaction[] = [];
  public transactions: Transaction[] = [];
  displayedColumns: string[] = ['name', 'category', 'amount', 'time'];

  public startDate?: Date;
  public endDate?: Date;

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  private getAllTransactions = () => {
    this.backend.getAllTransactions().subscribe(
      (res) => {
        this.allTransactions = res;
        console.log(res);
        this.transactions = res;
      },
      (err) => {
      console.log(err);
      }
    )
  }

  public selectionChanged = () => {
    if (this.startDate || this.endDate) {
      this.backend.getAllTransactionsFiltered(this.startDate, this.endDate).subscribe(
        (res) => {
          this.transactions = res;
        },
        (err) => {
          console.log(err);
        }
      )
    } else {
      this.transactions = this.allTransactions;
    }
  }
}
//
// this component:
// has filters to display different transactions and then displays based on the filter.

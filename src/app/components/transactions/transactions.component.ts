import {Component, OnInit, ViewChild} from '@angular/core';
import {Transaction} from "../../interfaces/Transaction";
import {BackendService} from "../../services/backend.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @ViewChild("transactionTable") table?: MatTable<Transaction>

  private allTransactions: Transaction[] = [];
  public transactions?: MatTableDataSource<Transaction>;
  displayedColumns: string[] = ['name', 'category', 'amount', 'time', 'delete'];

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
        this.transactions = new MatTableDataSource<Transaction>(res);
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
          this.transactions = new MatTableDataSource<Transaction>(res);
        },
        (err) => {
          console.log(err);
        }
      )
    } else {
      this.transactions = new MatTableDataSource<Transaction>(this.allTransactions);
    }
  }

  public deleteTransaction(element: any) {

  }

  applyFilter(event: any) {
    if (this.transactions) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.transactions.filter = filterValue.trim().toLowerCase();
    }
  }
}
//
// this component:
// has filters to display different transactions and then displays based on the filter.

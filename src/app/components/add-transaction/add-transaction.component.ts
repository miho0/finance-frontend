import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend.service";
import {Category} from "../../interfaces/Category";
import {Transaction} from "../../interfaces/Transaction";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  // form properties
  public transaction: Transaction = {name: "", category: "", time: new Date(), description: "", amount: 10};

  public allCategories: Category[] = [];

  constructor(private backend: BackendService, private dataS: DataService) { }

  ngOnInit(): void {
    this.dataS.getAllCategories().subscribe(
      (val) => {
        this.allCategories = val;
      }
    )
  }

  public buttonPressed() {
    console.log(this.transaction);
    this.backend.addTransaction(this.transaction);
  }

}

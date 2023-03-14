import { Injectable } from '@angular/core';
import {Category} from "../interfaces/Category";
import {Transaction} from "../interfaces/Transaction";
import {BackendService} from "./backend.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // data that the service holds
  private allCategories = new BehaviorSubject<Category[]>([]);
  private allTransactions = new BehaviorSubject<Transaction[]>([]);

  constructor(private backend: BackendService) {
    this.fetchAllCategories();
    this.fetchAllTransactions();
  }

  public getAllCategories(): Observable<Category[]> {
    return this.allCategories;
  }

  public getAllTransactions(): Observable<Transaction[]> {
    return this.allTransactions;
  }

  private fetchAllCategories = () => {
    this.backend.getAllCategories().subscribe(
      (res) => {
        this.allCategories.next(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  private fetchAllTransactions = () => {
    this.backend.getAllTransactions().subscribe(
      (res) => {
        this.allTransactions.next(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}

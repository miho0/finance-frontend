import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../interfaces/Category";
import {Transaction} from "../interfaces/Transaction";
import {CategoryExtra} from "../interfaces/CategoryExtra";
import {Month} from "../interfaces/Month";
import {RegisterDto} from "../interfaces/RegisterDto";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private link: string = "https://localhost:7199/"

  constructor(private http: HttpClient) { }

  // TODO premakni to nekam
  private formatDate = (date: Date): string => {
    return date.getFullYear().toString() + '-' + ((date.getMonth() < 9) ? '0' : '') + (date.getMonth()+1).toString() + '-' + ((date.getDate() < 9) ? '0' : '') + (date.getDate()+1).toString() + ' 00:00:00';
  }

  public getAllCategories = () : Observable<Category[]> => {
    return this.http.get<Category[]>(this.link + "Category/GetAll");
  }

  public getAllTransactions = (): Observable<Transaction[]> => {
    return this.http.get<Transaction[]>(this.link + "Entry/GetAll");
  }

  public getAllCategoriesExtra = (): Observable<CategoryExtra[]> => {
    return this.http.get<CategoryExtra[]>(this.link + "Category/GetExtra");
  }

  public getAllTransactionsFiltered = (start?: Date, end?: Date): Observable<Transaction[]> => {
    if (!start) start = new Date(2000, 1, 1);
    return this.http.get<Transaction[]>(this.link + "Entry/GetFiltered/" + this.formatDate(start) + (end? '/' +  this.formatDate(end) : ''));
  }

  public getTransactionsByCategory(cat: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.link + "Entry/GetByCategory?catName=" + cat);
  }

  public getTransactionsByMonth(cat: string): Observable<Month[]> {
    return this.http.get<Month[]>(this.link + "Entry/GetByMonth?catName=" + cat);
  }

  public addTransaction = (transaction: Transaction) : void => {
    this.http.post(this.link + "Entry/Insert", transaction).subscribe();
  }

  public register = (registerInfo: RegisterDto) => {
    return this.http.post(this.link + "User/Register", registerInfo);
  }

}


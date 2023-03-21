import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../interfaces/Category";
import {Transaction} from "../interfaces/Transaction";
import {CategoryExtra} from "../interfaces/CategoryExtra";
import {Month} from "../interfaces/Month";
import {RegisterDto} from "../interfaces/RegisterDto";
import {Message} from "../interfaces/Message";
import {LoginDto} from "../interfaces/LoginDto";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private link: string = "https://localhost:7199/"
  private o = {withCredentials: true};

  constructor(private http: HttpClient) { }

  // TODO premakni to nekam
  private formatDate = (date: Date): string => {
    return date.getFullYear().toString() + '-' + ((date.getMonth() < 9) ? '0' : '') + (date.getMonth()+1).toString() + '-' + ((date.getDate() < 9) ? '0' : '') + (date.getDate()+1).toString() + ' 00:00:00';
  }

  public getAllCategories = () : Observable<Category[]> => {
    return this.http.get<Category[]>(this.link + "Category/GetAll", this.o);
  }

  public getAllTransactions = (): Observable<Transaction[]> => {
    return this.http.get<Transaction[]>(this.link + "Entry/GetAll", this.o);
  }

  public getAllCategoriesExtra = (): Observable<CategoryExtra[]> => {
    return this.http.get<CategoryExtra[]>(this.link + "Category/GetExtra", this.o);
  }

  public getCategoryByName = (name: string) : Observable<Category> => {
    return this.http.get<Category>(this.link + `Category/GetByName/${name}`, this.o);
  }

  public getAllTransactionsFiltered = (start?: Date, end?: Date): Observable<Transaction[]> => {
    if (!start) start = new Date(2000, 1, 1);
    return this.http.get<Transaction[]>(this.link + "Entry/GetFiltered/" + this.formatDate(start) + (end? '/' +  this.formatDate(end) : ''), this.o);
  }

  public getTransactionsByCategory(cat: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.link + "Entry/GetByCategory?catName=" + cat, this.o);
  }

  public getTransactionsByMonth(cat: string): Observable<Month[]> {
    return this.http.get<Month[]>(this.link + "Entry/GetByMonth?catName=" + cat, this.o);
  }

  public addTransaction = (transaction: Transaction) : void => {
    this.http.post(this.link + "Entry/Insert", transaction, this.o).subscribe();
  }

  public addCategory = (category: Category) : Observable<Message> => {
    return this.http.post<Message>(this.link + "Category/Insert", category, this.o);
  }

  public deleteCategory = (name: string) => {
    return this.http.delete(this.link + `Category/Delete/${name}`, this.o).subscribe();
  }

  public register = (registerInfo: RegisterDto) => {
    return this.http.post(this.link + "User/Register", registerInfo, this.o);
  }

  public currentUser = () : Observable<Message> => {
    return this.http.get<Message>(this.link + "User/currentUser", this.o);
  }

  public login = (loginInfo: LoginDto) : Observable<Message> => {
    return this.http.get<Message>(this.link + `User/login/${loginInfo.username}/${loginInfo.password}`, this.o);
  }

  public logout = () : void => {
    this.http.get<Message>(this.link + "User/Logout", this.o).subscribe();
  }
}


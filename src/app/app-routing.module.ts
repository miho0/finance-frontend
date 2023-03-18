import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddTransactionComponent} from "./components/add-transaction/add-transaction.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {ExpenseChartComponent} from "./components/expense-chart/expense-chart.component";
import {ChartBoardComponent} from "./components/chart-board/chart-board.component";
import {MainComponent} from "./components/main/main.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {CategoryComponent} from "./components/category/category.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'charts', component: ChartBoardComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'modify/add-transaction', component: AddTransactionComponent},
  {path: 'categories/:name', component: CategoryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

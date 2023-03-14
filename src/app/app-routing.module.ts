import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddTransactionComponent} from "./components/add-transaction/add-transaction.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {ExpenseChartComponent} from "./components/expense-chart/expense-chart.component";
import {ChartBoardComponent} from "./components/chart-board/chart-board.component";
import {MainComponent} from "./components/main/main.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'charts', component: ChartBoardComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'add', component: AddTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

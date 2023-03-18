import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DateAdapter, MatNativeDateModule, MatOptionModule, MatRippleModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { TransactionsComponent } from './components/transactions/transactions.component';
import {MatTableModule} from "@angular/material/table";
import {NgChartsModule} from "ng2-charts";
import { ExpenseChartComponent } from './components/expense-chart/expense-chart.component';
import { ChartBoardComponent } from './components/chart-board/chart-board.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTransactionComponent,
    TransactionsComponent,
    ExpenseChartComponent,
    ChartBoardComponent,
    DonutChartComponent,
    MainComponent,
    HeaderComponent,
    CategoriesComponent,
    CategoryComponent,
    LineChartComponent,
    LoginComponent,
    RegisterComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        NgChartsModule,
        MatToolbarModule,
        MatTabsModule,
        MatRippleModule,
        MatIconModule,
        MatButtonToggleModule
    ],
  providers: [
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

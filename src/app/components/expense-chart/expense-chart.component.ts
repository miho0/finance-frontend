import {AfterContentInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ChartData} from "chart.js";
import {Category} from "../../interfaces/Category";
import {Transaction} from "../../interfaces/Transaction";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss']
})
export class ExpenseChartComponent implements AfterContentInit, OnChanges {
  constructor() {
  }
  @ViewChild(BaseChartDirective, { static: true }) myChart?: BaseChartDirective;

  @Input() displayingTransactions: Transaction[] = [];
  @Input() allCategories: Category[] = [];

  public data: ChartData<'bar'> = {labels: [], datasets: [{data: [], label: "total spent"}]};

  ngAfterContentInit(): void {
    this.fillChart();
  }

  ngOnChanges() {
    if (this.myChart) {
      this.fillChart()
    }
  }

  private fillChart() {
    this.data.labels = [];
    this.data.datasets[0].data = [];
    this.allCategories.forEach(cat => {
      this.data.labels?.push(cat.name);
      let total = 0;
      this.displayingTransactions.forEach(tr => {
        if (tr.category === cat.name) {
          total += tr.amount;
        }
      })
      this.data.datasets[0].data.push(total);
    })
    this.myChart?.update(0)
  }

}

import {AfterContentInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ChartData} from "chart.js";
import {Transaction} from "../../interfaces/Transaction";
import {Category} from "../../interfaces/Category";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements AfterContentInit, OnChanges {
  @ViewChild(BaseChartDirective, { static: true }) myChart?: BaseChartDirective;
  @Input() displayingTransactions: Transaction[] = [];
  @Input() allCategories: Category[] = [];

  public data: ChartData<'doughnut'> = {labels: [], datasets: [{data: []}]};

  ngAfterContentInit(): void {
    this.fillChart();
  }

  ngOnChanges() {
    console.log(this.displayingTransactions)
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
    this.myChart?.update()
  }
}

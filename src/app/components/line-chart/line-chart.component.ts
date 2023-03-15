import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

class ChartConfiguraion {
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true }) myChart?: BaseChartDirective;

  @Input() labels: string[] = [];
  @Input() chartData: number[] = [];

  public data: ChartData<"line"> = {
    datasets: [
      {
        data: [ 10, 20 ],
        label: 'spent'
      }
    ],
    labels: ['ab', 'jd']
  };

  public lineChartType: ChartType = 'line';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.fillChart();
  }

  ngOnChanges() {
    if (this.myChart) {
      this.fillChart()
    }
  }


  private fillChart() {
    this.data.labels = this.labels;
    this.data.datasets[0].data = this.chartData;
    this.myChart?.update(0)
  }

}

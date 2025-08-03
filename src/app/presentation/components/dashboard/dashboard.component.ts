import { ChartConfiguration, ChartDataset } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from 'ng2-charts';

import { ChangeDetectionStrategy, Component, OnInit, Signal, computed } from '@angular/core';
import { MatTab, MatTabContent, MatTabGroup } from '@angular/material/tabs';

import { SessionFacade } from '../../../domain/facades/session.facade';
import {
  computeAccuracyDailyAverages,
  computeWpmDailyAverages
} from '../../../domain/functions/session-analysis.functions';
import { DailyAverage } from '../../../domain/types/data.types';
import { SessionRecord } from '../../../domain/types/session.types';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { VirtualTableComponent } from '../virtual-table/virtual-table.component';

@Component({
  selector: 'kw-dashboard',
  imports: [BaseChartDirective, VirtualTableComponent, LoadingSvgComponent, MatTabGroup, MatTab, MatTabContent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  protected readonly headers: ReadonlyArray<string>;
  protected readonly lineChartOptions: ChartConfiguration<'line', DailyAverage[]>['options'];

  protected readonly sessions: Signal<ReadonlyArray<SessionRecord>>;
  protected readonly isLoading: Signal<boolean>;
  protected readonly lineChartData: Signal<ChartConfiguration<'line', DailyAverage[]>['data']>;

  constructor(private readonly sessionFacade: SessionFacade) {
    this.sessions = this.sessionFacade.selectAll();
    this.isLoading = this.sessionFacade.isLoading();
    this.lineChartData = computed(() => this.buildChartDatasets());
    this.lineChartOptions = this.buildChartOptions();
  }

  ngOnInit(): void {
    this.sessionFacade.loadAll();
  }

  private buildChartDatasets(): ChartConfiguration<'line', DailyAverage[]>['data'] {
    return {
      datasets: [this.buildAccuracyDataset(), this.buildWpmDataset()]
    };
  }

  private buildAccuracyDataset(): ChartDataset<'line', DailyAverage[]> {
    return {
      label: 'Accuracy (%)',
      data: computeAccuracyDailyAverages(this.sessions()).map((s) => ({
        day: s.day,
        average: s.average
      })),
      parsing: {
        xAxisKey: 'day',
        yAxisKey: 'average'
      },
      yAxisID: 'y1',
      fill: true,
      tension: 0.5,
      cubicInterpolationMode: 'monotone',
      borderColor: 'black'
    };
  }

  private buildWpmDataset(): ChartDataset<'line', DailyAverage[]> {
    return {
      label: 'Speed (WPM)',
      data: computeWpmDailyAverages(this.sessions()).map((s) => ({
        day: s.day,
        average: s.average
      })),
      parsing: {
        xAxisKey: 'day',
        yAxisKey: 'average'
      },
      yAxisID: 'y2',
      fill: true,
      tension: 0.5,
      cubicInterpolationMode: 'monotone',
      borderColor: 'black',
      backgroundColor: 'rgb(150, 244, 150)'
    };
  }

  private buildChartOptions(): ChartConfiguration<'line', DailyAverage[]>['options'] {
    return {
      responsive: true,
      scales: {
        x: {
          type: 'timeseries',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'dd/MM/yy'
            }
          },
          ticks: {
            maxTicksLimit: 15
          }
        },
        y1: {
          min: 90,
          max: 100,
          title: { display: true, text: 'Accuracy (%)' }
        },
        y2: {
          position: 'right',
          // min: 40,
          title: { display: true, text: 'Speed (WPM)' }
        }
      }
    };
  }
}

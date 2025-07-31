import { ChartConfiguration, ChartDatasetProperties } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { BaseChartDirective } from 'ng2-charts';

import { ChangeDetectionStrategy, Component, OnInit, Signal, computed } from '@angular/core';

import { SessionFacade } from '../../../domain/facades/session.facade';
import {
  computeAccuracyAveragesPerDay,
  computeWpmAveragesPerDay
} from '../../../domain/functions/session-analysis.functions';
import { SessionRecord } from '../../../domain/types/session.types';
import { LoadingSvgComponent } from '../svgs/loading-svg/loading-svg.component';
import { VirtualTableComponent } from '../virtual-table/virtual-table.component';

type ChartPoint = { x: Date | undefined; y: number };

@Component({
  selector: 'kw-dashboard',
  imports: [BaseChartDirective, VirtualTableComponent, LoadingSvgComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  protected readonly headers: ReadonlyArray<string>;
  protected readonly lineChartOptions: ChartConfiguration<'line', ChartPoint[]>['options'];
  // protected readonly lineChartLegend: boolean;

  protected readonly sessions: Signal<ReadonlyArray<SessionRecord>>;
  protected readonly isLoading: Signal<boolean>;
  protected readonly lineChartData: Signal<ChartConfiguration<'line', ChartPoint[]>['data']>;

  constructor(private readonly sessionFacade: SessionFacade) {
    this.sessions = this.sessionFacade.selectAll();
    this.isLoading = this.sessionFacade.isLoading();
    this.lineChartData = computed(() => this.buildChartDatasets());
    this.lineChartOptions = this.buildChartOptions();
    // this.lineChartLegend = true;
  }

  ngOnInit(): void {
    this.sessionFacade.loadAll();
  }

  private buildChartDatasets(): ChartConfiguration<'line', ChartPoint[]>['data'] {
    return {
      datasets: [this.buildAccuracyDataset(), this.buildWpmDataset()]
    };
  }

  private buildAccuracyDataset(): ChartDatasetProperties<'line', ChartPoint[]> {
    return {
      label: 'Accuracy (%)',
      data: computeAccuracyAveragesPerDay(this.sessions()).map((s) => ({
        x: s.date,
        y: s.average
      })),
      yAxisID: 'y1',
      fill: true,
      tension: 0.5,
      cubicInterpolationMode: 'monotone',
      borderColor: 'black'
    } as ChartDatasetProperties<'line', ChartPoint[]>;
  }

  private buildWpmDataset(): ChartDatasetProperties<'line', ChartPoint[]> {
    return {
      label: 'Speed (WPM)',
      data: computeWpmAveragesPerDay(this.sessions()).map((s) => ({
        x: s.date,
        y: s.average
      })),
      yAxisID: 'y2',
      fill: true,
      tension: 0.5,
      cubicInterpolationMode: 'monotone',
      borderColor: 'black',
      backgroundColor: 'rgb(150, 244, 150)'
    } as ChartDatasetProperties<'line', ChartPoint[]>;
  }

  private buildChartOptions(): ChartConfiguration<'line', ChartPoint[]>['options'] {
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

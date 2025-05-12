import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SessionTableComponent } from '../session-table/session-table.component';

@Component({
  selector: 'kw-dashboard',
  imports: [SessionTableComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}

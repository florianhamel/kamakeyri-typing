import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'kw-session-table',
  imports: [CdkTableModule],
  templateUrl: './session-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionTableComponent {
  protected readonly displayedColumns = ['id']
  protected readonly sessions = new ArrayDataSource([]);
}

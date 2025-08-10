import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type Row<T> = ReadonlyArray<Record<string, T>>;

@Component({
  selector: 'kw-virtual-table',
  standalone: true,
  imports: [CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport],
  templateUrl: './virtual-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualTableComponent<T> {
  headers = input.required<ReadonlyArray<string>>();
  rows = input.required<Row<T>>();
  protected readonly Object = Object;
}

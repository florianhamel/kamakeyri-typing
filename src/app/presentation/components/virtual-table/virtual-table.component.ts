import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

type Row<T> = ReadonlyArray<Record<string, T>>;

@Component({
  selector: 'kw-virtual-table',
  imports: [CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport],
  templateUrl: './virtual-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualTableComponent<T> {
  test = '100px';
  headers = input.required<ReadonlyArray<string>>();
  rows = input.required<Row<T>>();
  protected readonly Object = Object;
}

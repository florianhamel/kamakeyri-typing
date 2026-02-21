import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kw-loading-svg',
  imports: [],
  templateUrl: './loading-svg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSvgComponent {
  readonly firstColor: string = '#000000';
  readonly secondColor: string = '#000000';
}

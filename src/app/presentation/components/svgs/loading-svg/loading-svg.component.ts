import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loading-svg',
  imports: [CommonModule],
  templateUrl: './loading-svg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSvgComponent {
  readonly firstColor: string = '#000000';
  readonly secondColor: string = '#000000';
}

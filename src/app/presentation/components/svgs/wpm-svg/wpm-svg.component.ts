import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-wpm-svg',
  imports: [],
  templateUrl: './wpm-svg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpmSvgComponent {}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-wpm-svg',
  imports: [CommonModule],
  templateUrl: './wpm-svg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpmSvgComponent {}

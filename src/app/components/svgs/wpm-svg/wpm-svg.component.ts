import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wpm-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wpm-svg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpmSvgComponent {}

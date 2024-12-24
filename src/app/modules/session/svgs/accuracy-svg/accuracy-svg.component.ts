import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-accuracy-svg',
  imports: [CommonModule],
  templateUrl: './accuracy-svg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccuracySvgComponent {}

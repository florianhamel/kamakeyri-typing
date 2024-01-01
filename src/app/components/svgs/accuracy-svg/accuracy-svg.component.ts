import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accuracy-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accuracy-svg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccuracySvgComponent {}

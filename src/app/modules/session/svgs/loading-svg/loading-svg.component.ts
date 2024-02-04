import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-svg',
  standalone: true,
  imports: [],
  templateUrl: './loading-svg.component.svg'
})
export class LoadingSvgComponent {
  readonly firstColor: string = '#000000';
  readonly secondColor: string = '#000000';
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kw-tmp-test',
  imports: [CommonModule],
  templateUrl: './tmp-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TmpTestComponent {
  constructor() {}

  handleClick(): void {
    console.log('clicked');
  }
}

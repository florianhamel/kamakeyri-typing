import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kw-tmp-test',
  imports: [],
  templateUrl: './tmp-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TmpTestComponent {
  constructor() {}

  handleClick(): void {
    console.log('clicked');
  }
}

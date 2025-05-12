import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'kw-button',
  imports: [TranslateModule],
  templateUrl: './button.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  label = input.required<string>();
  type = input<string>('button');
  disabled = input<boolean>(false);
}

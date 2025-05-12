import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger, MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Language } from '../../../../domain/types/user.types';

export type MenuItem<T> = {
  langKey: string;
  value: T;
};

@Component({
  selector: 'kw-menu',
  imports: [MatMenu, MatMenuItem, MatMenuTrigger, MatIcon, TranslateModule],
  templateUrl: './menu.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  items = input.required<MenuItem<Language>[]>();
  icon = input<string>();
  xPosition = input<MenuPositionX>('after');
  yPosition = input<MenuPositionY>('below');

  itemSelected = output<Language>();

  protected updateSelection(event: any) {
    this.itemSelected.emit(event.value);
  }
}

import { TranslateModule } from '@ngx-translate/core';

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger, MenuPositionX, MenuPositionY } from '@angular/material/menu';

import { Language } from '../../../../domain/types/user.type';

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

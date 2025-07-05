import { Component, computed, effect, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { getLocalItem, removeLocalItem, setLocalItem } from '../../../application/helpers/storage.helper';
import { dialogActions } from '../../../state/actions/dialog.actions';
import { Route } from '../../../domain/enums/route.enum';
import { MenuComponent, MenuItem } from '../shared/menu/menu.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { Language } from '../../../domain/types/user.types';
import { userActions } from '../../../state/actions/user.actions';
import { selectIsLoggedIn, selectLang, selectUsername } from '../../../state/selectors/user.selectors';
import { UserState, userStateKey } from '../../../state/states/user.state';
import { selectDarkLightToggle } from '../../../state/selectors/feature-toggle.selectors';

export type NavItem = {
  langKey: string;
  route: string;
};

@Component({
  standalone: true,
  selector: 'kw-header',
  imports: [RouterLink, MenuComponent, TranslateModule, MatIcon],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected readonly isLoggedIn: Signal<boolean>;
  protected readonly username: Signal<string | null>;
  protected readonly lang: Signal<Language>;
  protected readonly lightMode: WritableSignal<'light' | 'dark'>;
  protected readonly lightModeIcon: Signal<'light_mode' | 'dark_mode'>;
  protected readonly isDarkLightEnabled: Signal<boolean>;

  protected readonly navItems: NavItem[] = [
    { langKey: 'header.nav.home', route: Route.Home },
    { langKey: 'header.nav.wiki', route: Route.Wiki },
    { langKey: 'header.nav.words', route: Route.CommonWords }
  ];

  protected readonly dashboardNavItem: NavItem = {
    langKey: 'header.nav.user',
    route: Route.Dashboard
  };

  protected readonly langItems: MenuItem<Language>[] = [
    { langKey: 'header.lang.fr', value: 'fr' },
    { langKey: 'header.lang.en', value: 'en' }
  ];

  constructor(
    private readonly store: Store,
    private readonly translateService: TranslateService
  ) {
    this.isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
    this.username = this.store.selectSignal(selectUsername);
    this.lang = this.store.selectSignal(selectLang);
    this.lightMode = signal('light');
    this.lightModeIcon = computed(() => (this.lightMode() === 'light' ? 'dark_mode' : 'light_mode'));
    this.isDarkLightEnabled = this.store.selectSignal(selectDarkLightToggle);
    effect(() => {
      this.translateService.use(this.lang());
    });
  }

  protected openDialog(): void {
    this.store.dispatch(dialogActions.openLogIn());
  }

  protected logOut(): void {
    removeLocalItem('userState');
    this.store.dispatch(userActions.reset());
  }

  protected changeLightMode() {
    this.lightMode.set(this.lightMode() === 'light' ? 'dark' : 'light');
  }

  protected updateLanguage(lang: Language) {
    const userState = getLocalItem<UserState>(userStateKey);
    setLocalItem(userStateKey, { ...userState, lang });
    if (this.isLoggedIn() && this.username()) {
      this.store.dispatch(userActions.updateLang({ username: this.username()!, lang }));
    } else {
      this.store.dispatch(userActions.updateLangSuccess({ lang }));
    }
  }
}

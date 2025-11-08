import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { getLocalItem, removeLocalItem, setLocalItem } from '../../../application/helpers/storage.helper';
import { kwRoute } from '../../../domain/constants/route.const';
import { DialogFacade } from '../../../domain/facades/dialog.facade';
import { FeatureToggleFacade } from '../../../domain/facades/feature-toggle.facade';
import { UserFacade } from '../../../domain/facades/user.facade';
import { Language } from '../../../domain/types/user.type';
import { UserState, userStateKey } from '../../../state/states/user.state';
import { MenuComponent, MenuItem } from '../shared/menu/menu.component';

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
    { langKey: 'header.nav.home', route: kwRoute.home },
    { langKey: 'header.nav.wiki', route: kwRoute.wiki },
    { langKey: 'header.nav.words', route: kwRoute.words }
  ];

  protected readonly dashboardNavItem: NavItem = {
    langKey: 'header.nav.user',
    route: kwRoute.dashboard
  };

  protected readonly langItems: MenuItem<Language>[] = [
    { langKey: 'header.lang.fr', value: 'fr' },
    { langKey: 'header.lang.en', value: 'en' }
  ];

  constructor(
    private readonly userFacade: UserFacade,
    private readonly dialogFacade: DialogFacade,
    private readonly featureToggleFacade: FeatureToggleFacade,
    private readonly translateService: TranslateService
  ) {
    this.isLoggedIn = this.userFacade.selectIsLoggedIn();
    this.username = this.userFacade.selectUsername();
    this.lang = this.userFacade.selectLang();
    this.lightMode = signal('light');
    this.lightModeIcon = computed(() => (this.lightMode() === 'light' ? 'dark_mode' : 'light_mode'));
    this.isDarkLightEnabled = this.featureToggleFacade.selectDarkLightToggle();
    effect(() => {
      this.translateService.use(this.lang());
    });
  }

  protected openDialog(): void {
    this.dialogFacade.openLogIn();
  }

  protected logOut(): void {
    removeLocalItem('userState');
    this.userFacade.reset();
  }

  protected changeLightMode() {
    this.lightMode.set(this.lightMode() === 'light' ? 'dark' : 'light');
  }

  protected updateLanguage(lang: Language) {
    const userState = getLocalItem<UserState>(userStateKey);
    setLocalItem(userStateKey, { ...userState, lang });
    if (this.isLoggedIn() && this.username()) {
      this.userFacade.updateLang(this.username()!, lang);
    } else {
      this.userFacade.updateLangSuccess(lang);
    }
  }
}

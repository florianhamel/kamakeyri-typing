import { Component, effect, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../common/types';
import { selectWikiState } from '../wiki/store/wiki.selectors';
import { selectAuthState, selectIsLoggedIn } from '../auth/store/auth.selectors';
import { NgIf } from '@angular/common';

type NavItem = {
  name: string;
  route: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  $authState: Signal<AuthState> = this.store.selectSignal(selectAuthState);
  $isLoggedIn: Signal<boolean> = this.store.selectSignal(selectIsLoggedIn);

  readonly navItems: NavItem[] = [
    { name: 'Kamakeyri', route: '' },
    { name: 'Wiki Typing', route: 'wiki' }
  ];

  readonly navLogIn: NavItem = { name: 'Log in', route: 'log-in' };

  constructor(private readonly store: Store) {}
}

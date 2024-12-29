import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { removeLocalItem } from '../../application/helpers/storage.helper';
import { selectAuthState, selectIsLoggedIn } from '../../state/selectors/auth.selectors';
import { AuthState } from '../../state/states/auth.state';
import { dialogActions } from '../../state/actions/dialog.actions';
import { Route } from '../../domain/enums/route.enum';

type NavItem = {
  name: string;
  route: string;
};

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  $authState: Signal<AuthState> = this.store.selectSignal(selectAuthState);
  $isLoggedIn: Signal<boolean> = this.store.selectSignal(selectIsLoggedIn);

  readonly navItems: NavItem[] = [
    { name: 'Kamakeyri', route: Route.Home },
    { name: '📚 Wiki Typing', route: Route.Wiki },
    { name: '⏱️ Common Words', route: Route.Words }
  ];

  readonly navLogIn: NavItem = { name: 'Log in', route: Route.LogIn };

  constructor(
    private readonly store: Store,
  ) {}

  openDialog(): void {
    this.store.dispatch(dialogActions.openLogIn());
  }

  logOut(): void {
    removeLocalItem('authState');
  }
}

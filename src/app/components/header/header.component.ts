import { Component, Signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { removeLocalItem } from '../../application/helpers/storage.helper';
import { selectAuthState, selectIsLoggedIn } from '../../state/selectors/auth.selectors';
import { LogInComponent } from '../log-in/log-in.component';
import { AuthState } from '../../state/states/auth.state';

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

  logInRef?: MatDialogRef<LogInComponent>;

  readonly navItems: NavItem[] = [
    { name: 'Kamakeyri', route: '' },
    { name: 'Wiki Typing', route: 'wiki' }
  ];

  readonly navLogIn: NavItem = { name: 'Log in', route: 'log-in' };

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  openDialog(): void {
    this.logInRef = this.dialog.open(LogInComponent);
  }

  logOut(): void {
    removeLocalItem('authState');
  }
}

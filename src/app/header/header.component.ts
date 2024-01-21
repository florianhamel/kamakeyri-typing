import { NgIf } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogInComponent } from '../auth/components/log-in/log-in.component';
import { selectAuthState, selectIsLoggedIn } from '../auth/store/auth.selectors';
import { AuthState } from '../common/types';

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

  logInRef?: MatDialogRef<LogInComponent>;

  readonly navItems: NavItem[] = [
    { name: 'Kamakeyri', route: '' },
    { name: 'Wiki Typing', route: 'wiki' },
    { name: 'Training', route: 'training' }
  ];

  readonly navLogIn: NavItem = { name: 'Log in', route: 'log-in' };

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  openDialog(): void {
    this.logInRef = this.dialog.open(LogInComponent);
  }
}

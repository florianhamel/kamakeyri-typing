import { Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { dialogActions } from '../state/actions/dialog.actions';
import { selectLogInDialogId } from '../state/selectors/dialog.selectors';

@Injectable({
  providedIn: 'root'
})
export class DialogFacade {
  constructor(private readonly store: Store) {}

  selectLogInDialogId(): Signal<string | null> {
    return this.store.selectSignal(selectLogInDialogId);
  }

  openLogIn(): void {
    this.store.dispatch(dialogActions.openLogIn());
  }

  updateLogInDialogId(logInDialogId: string | null): void {
    this.store.dispatch(dialogActions.updateLogInDialogId({ logInDialogId }));
  }
}

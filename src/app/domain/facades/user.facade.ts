import { Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { Credentials, Language } from '../types/user.type';
import { userActions } from '../../state/actions/user.actions';
import { selectExp, selectIsLoggedIn, selectLang, selectUsername, selectUserState } from '../../state/selectors/user.selectors';
import { UserState } from '../../state/states/user.state';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  constructor(private readonly store: Store) {}

  selectExp(): Signal<string | null> {
    return this.store.selectSignal(selectExp);
  }

  selectUsername(): Signal<string | null> {
    return this.store.selectSignal(selectUsername);
  }

  selectLang(): Signal<Language> {
    return this.store.selectSignal(selectLang);
  }

  selectUserState(): Signal<UserState> {
    return this.store.selectSignal(selectUserState);
  }

  selectIsLoggedIn(): Signal<boolean> {
    return this.store.selectSignal(selectIsLoggedIn);
  }

  logIn(credentials: Credentials): void {
    this.store.dispatch(userActions.logIn(credentials));
  }

  reset(): void {
    this.store.dispatch(userActions.reset());
  }

  updateLang(username: string, lang: Language): void {
    this.store.dispatch(userActions.updateLang({ username, lang }));
  }

  updateLangSuccess(lang: Language): void {
    this.store.dispatch(userActions.updateLangSuccess({ lang }));
  }
}

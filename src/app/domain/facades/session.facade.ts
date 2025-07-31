import { Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { sessionActions } from '../../state/actions/session.actions';
import { selectIsLoading, selectSessionRecords } from '../../state/selectors/session.selectors';
import { Session, SessionRecord } from '../types/session.types';

interface EntityFacade<T> {
  loadAll(): void;

  selectAll(): Signal<ReadonlyArray<T>>;
}

@Injectable({
  providedIn: 'root'
})
export class SessionFacade implements EntityFacade<Session> {
  constructor(private readonly store: Store) {}

  loadAll(): void {
    this.store.dispatch(sessionActions.loadAll());
  }

  selectAll(): Signal<ReadonlyArray<SessionRecord>> {
    return this.store.selectSignal(selectSessionRecords);
  }

  isLoading(): Signal<boolean> {
    return this.store.selectSignal(selectIsLoading);
  }
}

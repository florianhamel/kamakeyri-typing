import { Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { sessionActions } from '../state/actions/session.actions';
import {
  selectCanClose,
  selectHasStarted,
  selectIsLoading,
  selectSessionChars,
  selectSessionRecords,
  selectSessionState,
  selectStatus
} from '../state/selectors/session.selectors';
import { SessionState } from '../state/states/session.state';
import { InputEventSanitized } from '../../domain/types/event.type';
import { Session, SessionChar, SessionMetaData, SessionRecord, SessionStatus } from '../../domain/types/session.type';

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

  selectIsLoading(): Signal<boolean> {
    return this.store.selectSignal(selectIsLoading);
  }

  selectStatus(): Signal<SessionStatus> {
    return this.store.selectSignal(selectStatus);
  }

  selectHasStarted(): Signal<boolean> {
    return this.store.selectSignal(selectHasStarted);
  }

  selectSessionChars(): Signal<ReadonlyArray<SessionChar>> {
    return this.store.selectSignal(selectSessionChars);
  }

  selectCanClose(): Signal<boolean> {
    return this.store.selectSignal(selectCanClose);
  }

  selectSessionState(): Signal<SessionState> {
    return this.store.selectSignal(selectSessionState);
  }

  init(content: string): void {
    this.store.dispatch(sessionActions.init({ content }));
  }

  start(): void {
    this.store.dispatch(sessionActions.start());
  }

  update(event: InputEventSanitized): void {
    this.store.dispatch(sessionActions.update({ event }));
  }

  close(metaData: SessionMetaData): void {
    this.store.dispatch(sessionActions.close(metaData));
  }

  reset(): void {
    this.store.dispatch(sessionActions.reset());
  }
}

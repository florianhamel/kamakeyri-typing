import { Observable } from 'rxjs';

import { InjectionToken } from '@angular/core';

import { Session, SessionRecord } from '../types/session.type';

export type SessionRepository = {
  saveAll(sessions: ReadonlyArray<Session>): Observable<void>;
  findAll(): Observable<ReadonlyArray<SessionRecord>>;
};

export const SESSION_REPOSITORY = new InjectionToken<SessionRepository>('SessionRepository');

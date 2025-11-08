import { Observable } from 'rxjs';

import { InjectionToken } from '@angular/core';

import { Session, SessionRecord } from '../types/session.type';

export interface SessionRepository {
  saveAll(sessions: ReadonlyArray<Session>): Observable<void>;
  findAll(): Observable<ReadonlyArray<SessionRecord>>;
}

export const SessionRepository = new InjectionToken<SessionRepository>('SessionRepository');

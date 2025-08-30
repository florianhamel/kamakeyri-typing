import { Observable } from 'rxjs';

import { Session } from '../types/session.types';

export interface SessionRepository {
  saveAll(sessions: ReadonlyArray<Session>): Observable<void>;
  findAll(): Observable<ReadonlyArray<Session>>;
}

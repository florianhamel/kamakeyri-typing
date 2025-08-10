import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SessionRecord } from '../../domain/types/session.types';
import { SessionRecordDTO } from '../DTOs/session-record.dto';
import { SessionDTO } from '../DTOs/session.dto';
import { ApiUri } from '../URIs/api-uri.enum';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  static readonly url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.Session}`;

  constructor(private readonly http: HttpClient) {}

  public saveSessions(dtos: ReadonlyArray<SessionDTO>): Observable<void> {
    return this.http.post<void>(SessionService.url, dtos, { withCredentials: true });
  }

  public getSessions(): Observable<ReadonlyArray<SessionRecord>> {
    return this.http.get<ReadonlyArray<SessionRecordDTO>>(SessionService.url, { withCredentials: true }).pipe(
      map((sessions) =>
        sessions.map((s) => ({
          ...s,
          createDate: new Date(s.createDate)
        }))
      )
    );
  }
}

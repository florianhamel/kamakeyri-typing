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
  constructor(private readonly http: HttpClient) {}

  public saveSessions(dtos: ReadonlyArray<SessionDTO>): Observable<void> {
    const url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.Session}`;

    return this.http.post<void>(url, dtos, { withCredentials: true });
  }

  public getSessions(): Observable<ReadonlyArray<SessionRecord>> {
    const url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.Session}`;

    return this.http.get<ReadonlyArray<SessionRecordDTO>>(url, { withCredentials: true }).pipe(
      map((sessions) =>
        sessions.map((s) => ({
          ...s,
          createDate: new Date(s.createDate)
        }))
      )
    );
  }
}

import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SessionRepository } from '../../domain/repositories/session.repository';
import { SessionRecord } from '../../domain/types/session.types';
import { SessionDtos, SessionRecordDTO } from '../../infrastructure/DTOs/session.dtos';
import { toSessionRecord } from '../../infrastructure/mappers/session.mappers';
import { ApiUri } from '../../application/URIs/api-uri.enum';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements SessionRepository {
  static readonly url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.Session}`;

  constructor(private readonly http: HttpClient) {}

  public saveAll(dtos: ReadonlyArray<SessionDtos>): Observable<void> {
    return this.http.post<void>(SessionService.url, dtos, { withCredentials: true });
  }

  public findAll(): Observable<ReadonlyArray<SessionRecord>> {
    return this.http
      .get<ReadonlyArray<SessionRecordDTO>>(SessionService.url, { withCredentials: true })
      .pipe(map((dtos) => dtos.map((dto) => toSessionRecord(dto))));
  }
}

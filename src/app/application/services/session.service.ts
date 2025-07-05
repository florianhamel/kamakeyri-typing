import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionDTO } from '../DTOs/session.dto';
import { ApiUri } from '../URIs/api-uri.enum';
import { Session } from '../../domain/types/session.types';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private readonly http: HttpClient) {}

  public saveSessions(dtos: ReadonlyArray<SessionDTO>): Observable<void> {
    const url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.Session}`;

    return this.http.post<void>(url, dtos, { withCredentials: true });
  }

  public getSessions(): Observable<ReadonlyArray<Session>> {
    const url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.Session}`;

    return this.http.get<ReadonlyArray<Session>>(url, { withCredentials: true });
  }
}

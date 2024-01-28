import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment.development';
import { SessionDto } from '../models/session.types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // TODO create a file for api urls/uris
  readonly baseUrl: string = `${env.apiUrl}/typing`;

  constructor(private readonly http: HttpClient) {}

  uploadSessions(sessionDtos: Array<SessionDto>): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/sessions`, sessionDtos, { withCredentials: true });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionDto } from '../models/session.types';
import { Observable } from 'rxjs';
import { env } from '../../../../environments/environment.development';
import { apiUri } from '../../../common/models/api.constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // TODO create a file for api urls/uris
  private readonly baseUrl = `${env.apiUrl}/${apiUri.session}`;

  constructor(private readonly http: HttpClient) {}

  uploadSessions(sessionDtos: Array<SessionDto>): Observable<void> {
    return this.http.post<void>(this.baseUrl, sessionDtos, { withCredentials: true });
  }
}

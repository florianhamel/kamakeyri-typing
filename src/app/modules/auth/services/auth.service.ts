import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials, UserInfo } from '../../../common/types';
import { env } from '../../../../environments/environment.development';
import { ApiUri } from '../../../common/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl: string = `${env.apiUrl}/${ApiUri.auth}`;

  constructor(private readonly http: HttpClient) {}

  logIn(credentials: Credentials): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${this.baseUrl}/log-in`, credentials, {
      withCredentials: true
    });
  }
}

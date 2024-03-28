import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../environments/environment.development';
import { Credentials, UserInfo } from '../../../common/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  logIn(credentials: Credentials): Observable<UserInfo> {
    return this.http.post<UserInfo>(`${env.apiUrl}/auth/log-in`, credentials, {
      withCredentials: true
    });
  }
}

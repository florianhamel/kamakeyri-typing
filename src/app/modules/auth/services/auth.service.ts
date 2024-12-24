import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../environments/environment.development';
import { Credentials, AuthInfo } from '../models/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  logIn(credentials: Credentials): Observable<AuthInfo> {
    return this.http.post<AuthInfo>(`${env.apiUrl}/auth/log-in`, credentials, {
      withCredentials: true
    });
  }
}

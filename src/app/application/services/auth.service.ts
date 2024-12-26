import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInfo, Credentials } from '../../domain/types/auth.types';
import { env } from '../../../environments/environment.development';

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

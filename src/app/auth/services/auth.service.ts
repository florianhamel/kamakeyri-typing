import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials, UserInfo } from '../../common/types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl: string = 'http://localhost:8080/auth/log-in';

  constructor(private readonly http: HttpClient) {}

  logIn(credentials: Credentials): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.baseUrl, credentials, { withCredentials: true });
  }
}

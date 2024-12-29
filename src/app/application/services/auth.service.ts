import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInfo, Credentials } from '../../domain/types/auth.types';
import { ApiUri } from '../URIs/api-uri.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  logIn(credentials: Credentials): Observable<AuthInfo> {
    const url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.Auth}/${ApiUri.LogIn}`;
    return this.http.post<AuthInfo>(url, credentials, {
      withCredentials: true
    });
  }
}

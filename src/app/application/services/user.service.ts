import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials, UpdateLangDto, UserInfo } from '../../domain/types/user.types';
import { ApiUri } from '../URIs/api-uri.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  public logIn(credentials: Credentials): Observable<UserInfo> {
    const url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.Auth}/${ApiUri.LogIn}`;

    return this.http.post<UserInfo>(url, credentials, {
      withCredentials: true
    });
  }

  public updateLang(langDto: UpdateLangDto): Observable<void> {
    const url = `${ApiUri.Scheme}://${ApiUri.BaseUri}/${ApiUri.User}/${ApiUri.Lang}`;

    return this.http.patch<void>(url, langDto, {
      withCredentials: true
    });
  }
}

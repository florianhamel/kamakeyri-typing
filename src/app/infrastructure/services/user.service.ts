import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials, UpdateLangDto, UserInfo } from '../../domain/types/user.type';
import { apiUri } from '../constants/api.const';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class UserService implements UserRepository {
  constructor(private readonly http: HttpClient) {}

  public logIn(credentials: Credentials): Observable<UserInfo> {
    const url = `${apiUri.scheme}://${apiUri.baseUri}/${apiUri.auth}/${apiUri.logIn}`;

    return this.http.post<UserInfo>(url, credentials, {
      withCredentials: true
    });
  }

  public updateLang(langDto: UpdateLangDto): Observable<void> {
    const url = `${apiUri.scheme}://${apiUri.baseUri}/${apiUri.user}/${apiUri.lang}`;

    return this.http.patch<void>(url, langDto, {
      withCredentials: true
    });
  }
}

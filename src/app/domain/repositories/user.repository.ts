import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Credentials, UpdateLangDto, UserInfo } from '../types/user.type';

export type UserRepository = {
  logIn(credentials: Credentials): Observable<UserInfo>;
  updateLang(langDto: UpdateLangDto): Observable<void>;
};

export const USER_REPOSITORY = new InjectionToken<UserRepository>('UserRepository');

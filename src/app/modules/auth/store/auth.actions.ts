import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Credentials, UserInfo } from '../models/auth.types';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    logIn: props<Credentials>(),
    logInSuccess: props<UserInfo>(),
    logInError: emptyProps()
  }
});

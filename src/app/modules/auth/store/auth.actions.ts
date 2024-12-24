import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Credentials, AuthInfo } from '../models/auth.types';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    logIn: props<Credentials>(),
    logInSuccess: props<AuthInfo>(),
    logInError: emptyProps()
  }
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthInfo, Credentials } from '../../domain/types/auth.types';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    logIn: props<Credentials>(),
    logInSuccess: props<AuthInfo>(),
    logInError: emptyProps()
  }
});

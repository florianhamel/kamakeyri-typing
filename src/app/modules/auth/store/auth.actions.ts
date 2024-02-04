import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Credentials, UserInfo } from '../../../common/types';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    logIn: props<Credentials>(),
    logInSuccess: props<UserInfo>(),
    logInError: emptyProps()
  }
});

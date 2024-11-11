import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { setLocalItem } from '../../../common/storage';
import { sessionActions } from '../../session/store/session.actions';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { Credentials, UserInfo } from '../models/auth.types';

// TODO test this effect
export const authLogIn = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(authActions.logIn),
      exhaustMap(({ username, password }: Credentials) =>
        authService.logIn({ username, password }).pipe(
          tap(({ username, exp }: UserInfo) => {
            setLocalItem('authState', { username, exp });
            store.dispatch(sessionActions.uploadAll());
          }),
          map(({ username, exp }: UserInfo) => authActions.logInSuccess({ username, exp })),
          catchError(() => of(authActions.logInError()))
        )
      )
    );
  },
  { functional: true }
);

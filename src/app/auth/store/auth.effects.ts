import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { setStorageItem } from '../../common/local-storage';
import { UserInfo } from '../../common/types';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';

export const authLogIn = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.logIn),
      exhaustMap((credentials) =>
        authService.logIn(credentials).pipe(
          map(({ username, exp }: UserInfo) => {
            setStorageItem('authState', { username, exp });
            return authActions.logInSuccess({ username, exp });
          }),
          catchError(() => of(authActions.logInError()))
        )
      )
    );
  },
  { functional: true }
);

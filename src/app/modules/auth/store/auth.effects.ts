import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { Store } from '@ngrx/store';
import { sessionActions } from '../../session/store/session.actions';
import { UserInfo } from '../../../common/types';
import { setLocalItem } from '../../../common/storage';

// TODO test this effect & make this effect dispatch a sessionActions.uploadAll()
export const authLogIn = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(authActions.logIn),
      exhaustMap((credentials) =>
        authService.logIn(credentials).pipe(
          map(({ username, exp }: UserInfo) => {
            setLocalItem('authState', { username, exp });
            return authActions.logInSuccess({ username, exp });
          }),
          tap(() => store.dispatch(sessionActions.uploadAll())),
          catchError(() => of(authActions.logInError())),
        )
      )
    );
  },
  { functional: true }
);

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../application/services/auth.service';
import { authActions } from '../actions/auth.actions';
import { AuthInfo, Credentials } from '../../domain/types/auth.types';
import { setLocalItem } from '../../application/helpers/storage.helper';
import { sessionActions } from '../actions/session.actions';

// TODO test this effect
export const authLogIn = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(authActions.logIn),
      exhaustMap(({ username, password }: Credentials) =>
        authService.logIn({ username, password }).pipe(
          tap(({ username, exp }: AuthInfo) => {
            setLocalItem('authState', { username, exp });
            store.dispatch(sessionActions.uploadAllSaved());
          }),
          map(({ username, exp }: AuthInfo) => authActions.logInSuccess({ username, exp })),
          catchError(() => of(authActions.logInError()))
        )
      )
    );
  },
  { functional: true }
);

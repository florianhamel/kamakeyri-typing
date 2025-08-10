import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { UserService } from '../../application/services/user.service';
import { userActions } from '../actions/user.actions';
import { Credentials, Language } from '../../domain/types/user.types';
import { setLocalItem } from '../../application/helpers/storage.helper';
import { sessionActions } from '../actions/session.actions';

// TODO test this effect
export const userLogIn = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(userActions.logIn),
      exhaustMap(({ username, password }: Credentials) =>
        userService.logIn({ username, password }).pipe(
          tap(({ username, exp, lang }) => {
            setLocalItem('userState', { username, exp, lang });
            store.dispatch(sessionActions.uploadAllSaved()); // TODO create an effect for loginSuccess and do this inside
          }),
          map(({ username, exp, lang }) =>
            userActions.logInSuccess({ username, exp, lang: lang.toLowerCase() as Language })
          ),
          catchError(() => of(userActions.logInError()))
        )
      )
    );
  },
  { functional: true, dispatch: true }
);

// TODO test this effect
export const userUpdateLang = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(userActions.updateLang),
      exhaustMap(({ username, lang }) =>
        userService.updateLang({ username, lang }).pipe(
          map((_) => userActions.updateLangSuccess({ lang })),
          catchError((_) => of(userActions.updateLangSuccess({ lang })))
        )
      )
    );
  },
  { functional: true, dispatch: true }
);

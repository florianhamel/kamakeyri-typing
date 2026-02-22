import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { setLocalItem } from '../../functions/storage.functions';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository';
import { Credentials, Language } from '../../../domain/types/user.type';
import { sessionActions } from '../actions/session.actions';
import { userActions } from '../actions/user.actions';

// TODO test this effect
export const userLogIn = createEffect(
  (actions$ = inject(Actions), userRepository = inject(USER_REPOSITORY), store = inject(Store)) => {
    return actions$.pipe(
      ofType(userActions.logIn),
      exhaustMap(({ username, password }: Credentials) =>
        userRepository.logIn({ username, password }).pipe(
          tap(({ username, exp, lang }) => {
            setLocalItem('userState', { username, exp, lang: lang.toLowerCase() as Language });
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
  (actions$ = inject(Actions), userRepository = inject(USER_REPOSITORY)) => {
    return actions$.pipe(
      ofType(userActions.updateLang),
      exhaustMap(({ username, lang }) =>
        userRepository.updateLang({ username, lang }).pipe(
          map((_) => userActions.updateLangSuccess({ lang })),
          catchError((_) => of(userActions.updateLangSuccess({ lang })))
        )
      )
    );
  },
  { functional: true, dispatch: true }
);

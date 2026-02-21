import { EMPTY, Observable, catchError, exhaustMap, ignoreElements, map, of, switchMap, withLatestFrom } from 'rxjs';

import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { clearSessionItems, getSessionItem, setSessionItem } from '../../application/helpers/storage.helper';
import { Session } from '../../domain/types/session.type';
import { toSessionDTO } from '../../infrastructure/mappers/session.mappers';
import { SESSION_REPOSITORY } from '../../domain/repositories/session.repository';
import { sessionActions } from '../actions/session.actions';
import { actionDispatched, noActionDispatched } from '../helpers/effects.helpers';
import { selectSessionData } from '../selectors/session.selectors';
import { selectIsLoggedIn } from '../selectors/user.selectors';

export const sessionClose = createEffect(
  (actions$ = inject(Actions), sessionRepository = inject(SESSION_REPOSITORY), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.close),
      withLatestFrom(store.select(selectSessionData), store.select(selectIsLoggedIn)),
      exhaustMap(([metaData, sessionData, isLoggedIn]) => {
        const sessionDTO = toSessionDTO({ ...sessionData, ...metaData });
        const saveSession$ = isLoggedIn
          ? sessionRepository.saveAll([sessionDTO]).pipe(catchError(() => storeSession(sessionDTO)))
          : storeSession(sessionDTO);

        return saveSession$.pipe(ignoreElements());
      })
    );
  },
  noActionDispatched()
);

export const sessionUploadAllSaved = createEffect(
  (actions$ = inject(Actions), sessionRepository = inject(SESSION_REPOSITORY)) => {
    return actions$.pipe(
      ofType(sessionActions.uploadAllSaved),
      exhaustMap(() => {
        const sessions = getSessionItem<Array<Session>>('sessions');
        if (sessions) {
          return sessionRepository.saveAll(sessions.map((s) => toSessionDTO(s))).pipe(
            map(() => sessionActions.uploadAllSavedSuccess()),
            catchError(() => EMPTY)
          );
        }
        return EMPTY;
      })
    );
  },
  actionDispatched()
);

export const sessionClearSaved = createEffect((actions$ = inject(Actions)) => {
  return actions$.pipe(
    ofType(sessionActions.uploadAllSavedSuccess),
    exhaustMap(() => {
      clearSessionItems();
      return EMPTY;
    })
  );
}, noActionDispatched());

export const sessionLoadAll = createEffect(
  (actions$ = inject(Actions), sessionRepository = inject(SESSION_REPOSITORY)) => {
    return actions$.pipe(
      ofType(sessionActions.loadAll),
      switchMap(() =>
        sessionRepository.findAll().pipe(
          map((sessionRecords) => sessionActions.loadAllSuccess({ sessionRecords })),
          catchError(() => of(sessionActions.loadAllError()))
        )
      )
    );
  },
  actionDispatched()
);

function storeSession(sessionDto: Session): Observable<void> {
  const sessionDtos = getSessionItem<Session[]>('sessions');
  setSessionItem('sessions', sessionDtos ? [...sessionDtos, sessionDto] : [sessionDto]);

  return of();
}

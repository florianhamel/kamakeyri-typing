import { Observable, catchError, exhaustMap, ignoreElements, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { clearSessionItems, getSessionItem, setSessionItem } from '../../application/helpers/storage.helper';
import { toSessionDTO } from '../../application/mappers/session.mappers';
import { SessionService } from '../../application/services/session.service';
import { Session } from '../../domain/types/session.types';
import { sessionActions } from '../actions/session.actions';
import { selectSessionData } from '../selectors/session.selectors';
import { selectIsLoggedIn } from '../selectors/user.selectors';

export const sessionClose = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.close),
      withLatestFrom(store.select(selectSessionData), store.select(selectIsLoggedIn)),
      switchMap(([metaData, sessionData, isLoggedIn]) => {
        const sessionDTO = toSessionDTO({ ...sessionData, ...metaData });
        const save$ = isLoggedIn
          ? sessionService.saveSessions([sessionDTO]).pipe(catchError(() => storeSession(sessionDTO)))
          : storeSession(sessionDTO);

        return save$.pipe(ignoreElements());
      })
    );
  },
  { functional: true, dispatch: false }
);

export const sessionUploadAllSaved = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService)) => {
    return actions$.pipe(
      ofType(sessionActions.uploadAllSaved),
      exhaustMap(() => {
        const sessions = getSessionItem<Array<Session>>('sessions');

        return sessions ? sessionService.saveSessions(sessions.map((s) => toSessionDTO(s))) : of(undefined);
      }),
      tap(() => clearSessionItems()) // TODO dispatch an action to clearSessionItems() in an effect
    );
  },
  { functional: true, dispatch: false }
);

export const sessionLoadAll = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService)) => {
    return actions$.pipe(
      ofType(sessionActions.loadAll),
      switchMap(() =>
        sessionService.getSessions().pipe(
          map((sessionRecords) => sessionActions.loadAllSuccess({ sessionRecords })),
          catchError(() => of(sessionActions.loadAllError()))
        )
      )
    );
  },
  { functional: true, dispatch: true }
);

function storeSession(sessionDto: Session): Observable<void> {
  const sessionDtos = getSessionItem<Session[]>('sessions');
  setSessionItem('sessions', sessionDtos ? [...sessionDtos, sessionDto] : [sessionDto]);

  return of();
}

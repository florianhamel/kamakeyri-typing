import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, Observable, of, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { SessionService } from '../../application/services/session.service';
import { sessionActions } from '../actions/session.actions';
import { selectSessionRefined } from '../selectors/session.selectors';
import { selectIsLoggedIn } from '../selectors/auth.selectors';
import { SessionInfo } from '../../domain/types/session.types';
import {
  clearSessionItems,
  getSessionItem,
  setSessionItem
} from '../../application/helpers/storage.helper';

export const sessionUploadOrSave = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.uploadOrSave),
      concatLatestFrom(() => [store.select(selectSessionRefined), store.select(selectIsLoggedIn)]),
      exhaustMap(([metaData, sessionRefined, isLoggedIn]) => {
        const { type, ...sessionDto } = { ...sessionRefined, ...metaData };
        return isLoggedIn ?
            sessionService.uploadSessions([sessionDto]).pipe(catchError(() => saveSession(sessionDto)))
          : saveSession(sessionDto);
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
        const sessionDtos: Array<SessionInfo> | null = getSessionItem<Array<SessionInfo>>('sessions');
        return sessionDtos ? sessionService.uploadSessions(sessionDtos) : of(undefined);
      }),
      tap(() => clearSessionItems())
    );
  },
  { functional: true, dispatch: false }
);

function saveSession(sessionDto: SessionInfo): Observable<void> {
  const sessionDtos: SessionInfo[] | null = getSessionItem<SessionInfo[]>('sessions');
  setSessionItem('sessions', sessionDtos ? [...sessionDtos, sessionDto] : [sessionDto]);
  return of(undefined);
}

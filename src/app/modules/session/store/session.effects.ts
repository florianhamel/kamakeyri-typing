import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, Observable, of, tap } from 'rxjs';
import { SessionDto } from '../models/session.types';
import { SessionService } from '../services/session.service';
import { sessionActions } from './session.actions';
import { selectSessionRefined } from './session.selectors';
import { selectIsLoggedIn } from '../../auth/store/auth.selectors';
import { clearSessionItems, getSessionItem, setSessionItem } from '../../../common/storage';
import { concatLatestFrom } from '@ngrx/operators';

export const sessionUpload = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.upload),
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

export const sessionUploadAll = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService)) => {
    return actions$.pipe(
      ofType(sessionActions.uploadAll),
      exhaustMap(() => {
        const sessionDtos: Array<SessionDto> | null = getSessionItem<Array<SessionDto>>('sessions');
        return sessionDtos ? sessionService.uploadSessions(sessionDtos) : of(undefined);
      }),
      tap(() => clearSessionItems())
    );
  },
  { functional: true, dispatch: false }
);

function saveSession(sessionDto: SessionDto): Observable<void> {
  const sessionDtos: SessionDto[] | null = getSessionItem<SessionDto[]>('sessions');
  setSessionItem('sessions', sessionDtos ? [...sessionDtos, sessionDto] : [sessionDto]);
  return of(undefined);
}

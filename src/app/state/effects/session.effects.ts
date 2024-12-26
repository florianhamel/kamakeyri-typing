import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, Observable, of, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { SessionService } from '../../application/services/session.service';
import { sessionActions } from '../actions/session.actions';
import { selectSessionData } from '../selectors/session.selectors';
import { selectIsLoggedIn } from '../selectors/auth.selectors';
import { Session } from '../../domain/types/session.types';
import { clearSessionItems, getSessionItem, setSessionItem } from '../../application/helpers/storage.helper';
import { toSessionDTO } from '../../application/mappers/session.mapper';

export const sessionUploadOrSave = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.uploadOrSave),
      concatLatestFrom(() => [store.select(selectSessionData), store.select(selectIsLoggedIn)]),
      exhaustMap(([metaData, sessionData, isLoggedIn]) => {
        const sessionDTO = toSessionDTO({ ...sessionData, ...metaData });
        if (isLoggedIn) {
          sessionService
            .uploadSessions([sessionDTO])
            .pipe(catchError(() => saveSession(sessionDTO)))
            .subscribe();
        } else {
          saveSession(sessionDTO);
        }
        return of(sessionActions.close());
      })
    );
  },
  { functional: true, dispatch: true }
);

export const sessionUploadAllSaved = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService)) => {
    return actions$.pipe(
      ofType(sessionActions.uploadAllSaved),
      exhaustMap(() => {
        const sessions = getSessionItem<Array<Session>>('sessions');
        return sessions ? sessionService.uploadSessions(sessions.map((s) => toSessionDTO(s))) : of(undefined);
      }),
      tap(() => clearSessionItems())
    );
  },
  { functional: true, dispatch: false }
);

function saveSession(sessionDto: Session): Observable<void> {
  const sessionDtos = getSessionItem<Session[]>('sessions');
  setSessionItem('sessions', sessionDtos ? [...sessionDtos, sessionDto] : [sessionDto]);
  return of(undefined);
}

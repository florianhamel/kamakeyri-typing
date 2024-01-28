import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, of, tap } from 'rxjs';
import { getSessionItem, setSessionItem } from '../../common/storage';
import { SessionDto } from '../models/session.types';
import { SessionService } from '../services/session.service';
import { sessionActions } from './session.actions';
import { selectSessionRefined } from './session.selectors';

export const sessionSave = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.save),
      concatLatestFrom(() => [store.select(selectSessionRefined)]),
      tap(([metaData, sessionRefined]) => {
        const sessionDto: SessionDto = { ...sessionRefined, ...metaData };
        const sessionDtos: SessionDto[] | null = getSessionItem<SessionDto[]>('sessions');
        if (sessionDtos) {
          setSessionItem('sessions', [...sessionDtos, sessionDto]);
        } else {
          setSessionItem('sessions', [sessionDto]);
        }
      })
    );
  },
  { functional: true, dispatch: false }
);

export const sessionUpload = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.upload),
      concatLatestFrom(() => [store.select(selectSessionRefined)]),
      exhaustMap(([metaData, sessionRefined]) => {
        const sessionDto: SessionDto = { ...metaData, ...sessionRefined };
        return sessionService.uploadSession({ ...metaData, ...sessionRefined }).pipe(
          catchError(() => {
            const sessionDtos: SessionDto[] | null = getSessionItem<SessionDto[]>('sessions');
            if (sessionDtos) {
              setSessionItem('sessions', [...sessionDtos, sessionDto]);
            } else {
              setSessionItem('sessions', [sessionDto]);
            }
            return of();
          })
        );
      })
    );
  },
  { functional: true, dispatch: false }
);

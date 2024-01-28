import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, of, tap } from 'rxjs';
import { clearSessionItems, getSessionItem, setSessionItem } from '../../common/storage';
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
        const { type, ...sessionDto } = { ...sessionRefined, ...metaData };
        const sessionDtos: SessionDto[] | null = getSessionItem<SessionDto[]>('sessions');
        setSessionItem('sessions', sessionDtos ? [...sessionDtos, sessionDto] : [sessionDto]);
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
        const { type, ...sessionDto } = { ...sessionRefined, ...metaData };
        return sessionService.uploadSessions([sessionDto]).pipe(
          catchError(() => {
            const sessionDtos: SessionDto[] | null = getSessionItem<SessionDto[]>('sessions');
            setSessionItem('sessions', sessionDtos ? [...sessionDtos, sessionDto] : [sessionDto]);
            return of(undefined);
          })
        );
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

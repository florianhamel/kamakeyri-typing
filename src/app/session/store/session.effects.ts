import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, tap } from 'rxjs';
import { SessionService } from '../services/session.service';
import { sessionActions } from './session.actions';
import { selectSessionRefined } from './session.selectors';

export const sessionUpload = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService), store = inject(Store)) => {
    actions$.pipe(
      ofType(sessionActions.upload),
      tap(() => console.log('hello')),
      concatLatestFrom(() => [store.select(selectSessionRefined)]),
      tap(([metaData, sessionRefined]) => {
        console.log({ ...sessionRefined, ...metaData });
      })
    );
    return of();
  },  
  { functional: true, dispatch: false }
);

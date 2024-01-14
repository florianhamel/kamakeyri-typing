import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap } from 'rxjs';
import { SessionService } from '../services/session.service';
import { sessionActions } from './session.actions';
import { selectSessionRefined } from './session.selectors';

export const sessionUpload = createEffect(
  (actions$ = inject(Actions), sessionService = inject(SessionService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.upload),
      concatLatestFrom(() => [store.select(selectSessionRefined)]),
      exhaustMap(([metaData, sessionRefined]) => {
        console.log({ ...metaData, ...sessionRefined });
        return sessionService.uploadSession({ ...metaData, ...sessionRefined });
      })
    );
  },
  { functional: true, dispatch: false }
);

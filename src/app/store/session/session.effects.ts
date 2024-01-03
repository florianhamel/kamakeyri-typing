import { NgZone, inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { SessionState } from '../../models/types';
import { isCorrect, lastSessionChar } from '../../utils/session/utils.session';
import { sessionActions } from './session.actions';
import { selectIndex, selectSessionChars } from './session.selectors';

export const sessionCheckStatus = createEffect(
  (actions$ = inject(Actions), store = inject(Store<SessionState>), zone = inject(NgZone)) => {
    return actions$.pipe(
      ofType(sessionActions.checkStatus),
      concatLatestFrom(() => [store.select(selectSessionChars), store.select(selectIndex)]),
      filter(([, sessionChars, index]) => sessionChars.length <= index && isCorrect(lastSessionChar(sessionChars))),
      map(() => sessionActions.close())
    );
  },
  { functional: true }
);

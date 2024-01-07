import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { isCorrect, lastSessionChar } from '../utils/utils.session';
import { sessionActions } from './session.actions';
import { selectSessionState } from './session.selectors';

export const sessionCloseIfNeeded = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) => {
    return actions$.pipe(
      ofType(sessionActions.closeIfNeeded),
      concatLatestFrom(() => [store.select(selectSessionState)]),
      filter(([, state]) => state.sessionChars.length <= state.index && isCorrect(lastSessionChar(state.sessionChars))),
      map(() => sessionActions.close())
    );
  },
  { functional: true }
);

import { createSelector } from '@ngrx/store';

import { exists, isNull } from '../../domain/functions/common.functions';
import { isCorrect, lastSessionChar } from '../../domain/functions/session-common.functions';
import { SessionData } from '../../domain/types/session.types';
import { sessionFeature } from '../reducers/session.reducer';

export const {
  selectSessionRecords,
  selectIsLoading,
  selectStart,
  selectEnd,
  selectIndex,
  selectSessionChars,
  selectKeystrokes,
  selectErrors,
  selectStatus,
  selectSessionState,
  selectIsComposing
} = sessionFeature;

export const selectSessionData = createSelector(selectSessionState, (state): SessionData => {
  return {
    time: exists(state.start) && exists(state.end) ? state.end!.getTime() - state.start!.getTime() : 0,
    length: state.sessionChars.length,
    keystrokes: state.keystrokes,
    errors: state.errors
  };
});

export const selectHasStarted = createSelector(selectStart, (start): boolean => !isNull(start));

export const selectCanClose = createSelector(
  selectSessionChars,
  selectIndex,
  (sessionChars, index): boolean => sessionChars.length <= index && isCorrect(lastSessionChar(sessionChars))
);

import { createSelector } from '@ngrx/store';
import { sessionFeature } from '../reducers/session.reducer';
import { SessionRefined } from '../../domain/types/session.types';
import { exists } from '../../domain/functions/common.functions';

export const {
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

export const selectSessionRefined = createSelector(selectSessionState, (state): SessionRefined => {
  return {
    time: exists(state.start) && exists(state.end) ? state.end!.getTime() - state.start!.getTime() : 0,
    length: state.sessionChars.length,
    keystrokes: state.keystrokes,
    errors: state.errors
  };
});

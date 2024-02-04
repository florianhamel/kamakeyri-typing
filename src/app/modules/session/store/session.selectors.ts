import { createSelector } from '@ngrx/store';
import { SessionRefined } from '../models/session.types';
import { sessionFeature } from './session.reducer';
import { exists } from '../../../common/checks/common.checks';

export const {
  selectStart,
  selectEnd,
  selectIndex,
  selectSessionChars,
  selectKeystrokes,
  selectErrors,
  selectStatus,
  selectSessionState
} = sessionFeature;

export const selectSessionRefined = createSelector(selectSessionState, (state): SessionRefined => {
  return {
    time: exists(state.start) && exists(state.end) ? state.end!.getTime() - state.start!.getTime() : 0,
    length: state.sessionChars.length,
    keystrokes: state.keystrokes,
    errors: state.errors
  };
});

import { createSelector } from '@ngrx/store';
import { exists } from '../../common/checks/common.checks';
import { SessionCore } from '../../common/types';
import { sessionFeature } from './session.reducer';

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

export const selectSessionCore = createSelector(selectSessionState, (state): SessionCore => {
  return {
    time: exists(state.start) && exists(state.end) ? state.end!.getTime() - state.start!.getTime() : 0,
    length: state.sessionChars.length,
    keystrokes: state.keystrokes,
    errors: state.errors
  };
});

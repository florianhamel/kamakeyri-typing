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

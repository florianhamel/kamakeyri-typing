import { SessionState } from '../../models/store.types';

export const initialState: SessionState = {
  start: null,
  end: null,
  index: 0,
  sessionChars: [],
  keystrokes: 0,
  errors: 0
};

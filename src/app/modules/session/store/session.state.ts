import { SessionState } from '../models/session.types';

export const initialState: SessionState = {
  start: null,
  end: null,
  index: 0,
  sessionChars: [],
  keystrokes: 0,
  errors: 0,
  status: 'notStarted',
  isComposing: false
};

import { SessionState } from '../../models/store.types';

export const initialState: SessionState = {
  status: 'notStarted',
  start: null,
  end: null,
  intervalId: null,
  index: 0,
  sessionChars: [],
  keystrokes: 0,
  errors: 0
};

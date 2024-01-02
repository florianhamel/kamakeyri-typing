import { SessionState } from '../../models/types';

export const initialState: SessionState = {
  start: null,
  end: null,
  intervalId: null,
  index: 0,
  sessionChars: [],
  keystrokes: 0,
  errors: 0,
  status: 'notStarted'
};

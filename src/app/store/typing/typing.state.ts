import { TypingState } from '../../models/types';

export const initialState: TypingState = {
  start: null,
  end: null,
  index: 0,
  charWraps: [],
  keystrokes: 0,
  errors: 0
};
